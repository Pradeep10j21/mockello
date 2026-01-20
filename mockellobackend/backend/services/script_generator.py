import logging
import json
import random
from groq import Groq
from backend.config import settings

logger = logging.getLogger(__name__)

# Initialize Groq client pool
clients = []
if settings.AI_API_KEYS:
    keys = [k.strip() for k in settings.AI_API_KEYS.split(",") if k.strip()]
    for key in keys:
        try:
            clients.append(Groq(api_key=key))
        except Exception as e:
            logger.error(f"Failed to init Groq client key: {e}")

def generate_topic_script(topic: str, num_turns: int = 15) -> list:
    """
    Generates a debate script with diverse perspectives (For, Against, Neutral)
    Returns a list of dicts: [{"sentiment": "For", "text": "..."}]
    """
    if not clients:
        logger.error("No AI clients available for script generation.")
        return []

    system_prompt = (
        "You are an expert debate script writer. "
        f"Generate a realistic Group Discussion script on the topic: '{topic}'. "
        f"Create exactly {num_turns} turns. "
        "Include 3 distinct perspectives: 'For', 'Against', and 'Neutral'. "
        "The conversation should flow naturally, with participants building on or countering previous points. "
        "Do NOT include speaker names, just the sentiment and the text. "
        "Output MUST be a valid JSON array of objects with keys 'sentiment' and 'text'. "
        "Example: [{'sentiment': 'For', 'text': 'I believe...'}, {'sentiment': 'Against', 'text': 'But consider...'}]"
    )

    # Retry Logic with Rotation
    attempts = 0
    max_attempts = len(clients)
    start_idx = random.randint(0, len(clients) - 1) if clients else 0
    
    script_content = []

    while attempts < max_attempts or attempts < 3:
        if not clients:
            break
        client_idx = (start_idx + attempts) % len(clients)
        current_client = clients[client_idx]
        
        try:
            print(f"Generating script for '{topic}' using client {client_idx}...")
            response = current_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": f"Topic: {topic}"}
                ],
                model="llama-3.3-70b-versatile",
                temperature=0.7,
                response_format={"type": "json_object"} 
            )
            
            content = response.choices[0].message.content.strip()
            parsed = json.loads(content)
            
            if isinstance(parsed, dict):
                for val in parsed.values():
                    if isinstance(val, list):
                        script_content = val
                        break
            elif isinstance(parsed, list):
                script_content = parsed
            
            if script_content:
                logger.info(f"Generated {len(script_content)} turns for topic {topic}")
                return script_content
            else:
                print("Parsed JSON but found no list. Retrying...")
                attempts += 1

        except Exception as e:
            print(f"Script Generation Error (Client {client_idx}): {e}")
            attempts += 1
            
    print("Failed to generate script after rotations.")
    return []
