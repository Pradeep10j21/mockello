import { Link } from "react-router-dom";
import { Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentApprovalPending = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-card border rounded-xl p-8 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-yellow-600" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold font-display">Waiting for Approval</h1>
                    <p className="text-muted-foreground">
                        Your account has been created successfully! Your college needs to verify your details before you can access the dashboard.
                    </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg text-sm text-left space-y-3">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Registration Completed</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <span className="font-medium">College Verification Pending</span>
                    </div>
                    <div className="flex items-start gap-3 opacity-50">
                        <div className="w-5 h-5 rounded-full border-2 border-current shrink-0" />
                        <span>Access Dashboard</span>
                    </div>
                </div>

                <div className="pt-4">
                    <Button variant="outline" asChild className="w-full">
                        <Link to="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StudentApprovalPending;
