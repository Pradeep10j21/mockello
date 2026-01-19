import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../services/apiConfig";

import { Check, X, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const CollegeStudentVerification = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const { toast } = useToast();
    const collegeEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        fetchPendingStudents();
    }, []);

    const fetchPendingStudents = async () => {
        console.log("Fetching pending students for:", collegeEmail);
        if (!collegeEmail) {
            console.error("No college email found in localStorage!");
            return;
        }
        try {
            const url = `${API_BASE_URL}/college/pending-students/${collegeEmail}`;
            console.log("Requesting URL:", url);


            const response = await fetch(url);
            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched data:", data);
                setStudents(data);
            } else {
                console.error("Response not OK:", await response.text());
            }
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (studentEmail: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/college/verify-student/${studentEmail}`, {

                method: 'POST'
            });

            if (response.ok) {
                toast({
                    title: "Student Verified",
                    description: "The student can now access their dashboard."
                });
                // Remove from list
                setStudents(prev => prev.filter(s => s.email !== studentEmail));
                setSelectedStudent(null);
            } else {
                throw new Error("Verification failed");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not verify student.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-display mb-2">Student Verification</h1>
                    <p className="text-muted-foreground">Verify pending student registrations.</p>
                </div>

                <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search pending students..." className="pl-9" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="h-8 gap-1">
                                <Clock className="w-3 h-3" />
                                {students.length} Pending
                            </Badge>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Register No.</TableHead>
                                <TableHead>Degree/Branch</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                                </TableRow>
                            ) : students.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                        No pending verifications.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-medium cursor-pointer hover:underline" onClick={() => setSelectedStudent(student)}>
                                            {student.fullName}
                                        </TableCell>
                                        <TableCell>{student.registerNumber || "N/A"}</TableCell>
                                        <TableCell>{student.degree} - {student.branch}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="sm" variant="outline" onClick={() => setSelectedStudent(student)}>
                                                View
                                            </Button>
                                            <Button size="sm" onClick={() => handleVerify(student.email)} className="bg-green-600 hover:bg-green-700 text-white">
                                                <Check className="w-4 h-4 mr-1" /> Approve
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Student Details</DialogTitle>
                            <DialogDescription>Review student information before verification.</DialogDescription>
                        </DialogHeader>
                        {selectedStudent && (
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground">Personal Info</h4>
                                    <p className="mt-1 font-medium">{selectedStudent.fullName}</p>
                                    <p className="text-sm">{selectedStudent.email}</p>
                                    <p className="text-sm">{selectedStudent.mobileNumber}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground">Academic Info</h4>
                                    <p className="mt-1 text-sm"><span className="font-medium">Msg:</span> {selectedStudent.degree} in {selectedStudent.branch}</p>
                                    <p className="text-sm"><span className="font-medium">Year:</span> {selectedStudent.yearOfPassing || "N/A"}</p>
                                    <p className="text-sm"><span className="font-medium">Reg No:</span> {selectedStudent.registerNumber}</p>
                                    <p className="text-sm"><span className="font-medium">CGPA:</span> {selectedStudent.cgpa}</p>
                                </div>
                                <div className="col-span-2">
                                    <h4 className="font-semibold text-sm text-muted-foreground">Skills</h4>
                                    <p className="mt-1 text-sm bg-muted p-2 rounded">{selectedStudent.skills || "None listed"}</p>
                                </div>
                                <div className="col-span-2">
                                    <h4 className="font-semibold text-sm text-muted-foreground">Experience</h4>
                                    <p className="mt-1 text-sm bg-muted p-2 rounded">{selectedStudent.internshipExperience || "None listed"}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="outline" onClick={() => setSelectedStudent(null)}>Close</Button>
                            <Button onClick={() => selectedStudent && handleVerify(selectedStudent.email)} className="bg-green-600 text-white">
                                Verify Student
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default CollegeStudentVerification;
