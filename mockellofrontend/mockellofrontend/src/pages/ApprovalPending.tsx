import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";

const ApprovalPending = () => {
    const userRole = localStorage.getItem("userRole") || "User";
    const roleCapitalized = userRole.charAt(0).toUpperCase() + userRole.slice(1);

    return (
        <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-4">
            <div className="card-forest max-w-md w-full text-center p-8 animate-fade-up space-y-6">
                <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-10 h-10 text-forest-deep animate-pulse" />
                </div>

                <div className="space-y-2">
                    <h1 className="font-display text-2xl font-bold text-foreground">
                        {roleCapitalized} Verification Pending
                    </h1>
                    <p className="text-muted-foreground">
                        Thank you for joining Mockello! Your {userRole} profile has been submitted and is currently being reviewed by our Super Admin.
                    </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-xl text-sm text-left space-y-4 border border-border">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-foreground">Account Registered</p>
                            <p className="text-xs text-muted-foreground text-opacity-70">Credentials successfully created</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-foreground">Onboarding Completed</p>
                            <p className="text-xs text-muted-foreground text-opacity-70">Profile details successfully submitted</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-foreground">Super Admin Review</p>
                            <p className="text-xs text-muted-foreground">Verification usually takes 24-48 hours</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground">
                        We will notify you once your account is active.
                    </p>
                    <Link to="/" className="w-full">
                        <Button variant="outline" className="w-full gap-2 border-sage text-forest-deep hover:bg-sage/10">
                            <ArrowLeft size={16} />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ApprovalPending;
