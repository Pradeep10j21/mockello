import { useState, useRef } from "react";
import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, BookOpen, Award, Code, FileText, Upload, Edit, Save, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialProfileData = {
  fullName: "Rahul Sharma", email: "rahul.sharma@mit.edu", phone: "+91 98765 43210", altEmail: "rahul.alt@gmail.com",
  registerNumber: "2021CS001", collegeName: "Mumbai Institute of Technology", degree: "B.Tech", branch: "Computer Science (CSE)",
  yearOfPassing: "2025", cgpa: "8.5", semWiseCGPA: "Sem1: 8.0, Sem2: 8.5, Sem3: 8.2, Sem4: 8.8, Sem5: 8.6",
  skills: ["Python", "JavaScript", "React", "Node.js", "Machine Learning", "SQL"], resumeUploaded: true
};

const StudentProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setProfileData(initialProfileData);
    setIsEditing(false);
    setResumeFile(null);
    setResumeFileName(null);
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setResumeFile(file);
      setResumeFileName(file.name);
      setProfileData(prev => ({ ...prev, resumeUploaded: true }));
      
      toast({
        title: "Resume Uploaded",
        description: `${file.name} has been successfully uploaded.`,
      });
    }
  };

  return (
    <StudentDashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal and academic information</p>
          </div>
          {!isEditing ? (
            <Button onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{profileData.fullName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">College Email</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />{profileData.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />{profileData.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">Alternate Email</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.altEmail}
                      onChange={(e) => handleChange("altEmail", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{profileData.altEmail}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Register Number</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.registerNumber}
                      onChange={(e) => handleChange("registerNumber", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{profileData.registerNumber}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">College Name</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.collegeName}
                      onChange={(e) => handleChange("collegeName", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{profileData.collegeName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">Degree</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.degree}
                      onChange={(e) => handleChange("degree", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{profileData.degree}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">Branch</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.branch}
                      onChange={(e) => handleChange("branch", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{profileData.branch}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">Year of Passing</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.yearOfPassing}
                      onChange={(e) => handleChange("yearOfPassing", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold">{profileData.yearOfPassing}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground">CGPA</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.cgpa}
                      onChange={(e) => handleChange("cgpa", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold text-primary text-xl">{profileData.cgpa}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50"><CardHeader><CardTitle className="font-serif flex items-center gap-2"><Code className="w-5 h-5 text-primary" />Skills</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{profileData.skills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div></CardContent></Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50"><CardContent className="p-6 text-center"><div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-serif font-bold text-3xl">RS</div><h3 className="font-serif font-bold text-xl">{profileData.fullName}</h3><p className="text-sm text-muted-foreground">{profileData.branch}</p><p className="text-xs text-muted-foreground">{profileData.collegeName}</p></CardContent></Card>
            <Card className="border-secondary/30 bg-secondary/5"><CardContent className="p-6 text-center"><Award className="w-8 h-8 text-secondary mx-auto mb-2" /><p className="text-4xl font-bold font-serif text-secondary">{profileData.cgpa}</p><p className="text-sm text-muted-foreground">Current CGPA</p></CardContent></Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">Resume</p>
                    {resumeFileName || profileData.resumeUploaded ? (
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                        <p className="text-sm text-secondary">
                          {resumeFileName || "Resume.pdf"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No resume uploaded</p>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleResumeUpload}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {resumeFileName || profileData.resumeUploaded ? "Update Resume" : "Upload Resume"}
                </Button>
                {resumeFile && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {(resumeFile.size / 1024).toFixed(1)} KB
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentProfilePage;
