from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import time

router = APIRouter(prefix="/interview/room", tags=["interview-room"])

# Simple in-memory store: companyId -> list of peer ids
ROOM_PEERS = {}


class JoinRequest(BaseModel):
    companyId: str
    peerId: str
    role: str = "participant"


@router.post("/join")
def join_room(req: JoinRequest):
    if not req.companyId or not req.peerId:
        raise HTTPException(status_code=400, detail="companyId and peerId required")

    peers = ROOM_PEERS.setdefault(req.companyId, [])

    # Remove stale entries > 300s
    now = time.time()
    peers[:] = [p for p in peers if now - p.get("ts", now) < 300]

    # Add or update this peer
    for p in peers:
        if p["peerId"] == req.peerId:
            p["ts"] = now
            p["role"] = req.role
            break
    else:
        peers.append({"peerId": req.peerId, "role": req.role, "ts": now})

    # Return list of other peers (excluding self)
    others = [p for p in peers if p["peerId"] != req.peerId]
    return {"peers": others}


@router.get("/{companyId}/peers")
def list_peers(companyId: str):
    peers = ROOM_PEERS.get(companyId, [])
    now = time.time()
    peers[:] = [p for p in peers if now - p.get("ts", now) < 300]
    return {"peers": peers}
