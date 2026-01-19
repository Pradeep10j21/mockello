import { useNavigate } from "react-router-dom";
import CollegeSidebar from "@/components/CollegeSidebar";
import { API_BASE_URL } from "../../services/apiConfig";

import { Building2, MapPin, Mail, Phone, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

import { useEffect } from "react";
// ... imports

const CollegeProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const collegeEmail = localStorage.getItem("userEmail");

  const [profile, setProfile] = useState({
    collegeName: "",
    university: "",
    location: "",
    address: "",
    officerName: "",
    officerEmail: "",
    officerPhone: "",
    courses: "",
    totalStudents: "",
    website: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!collegeEmail) return;
      try {
        const response = await fetch(`${API_BASE_URL}/college/me/${collegeEmail}`);

        if (response.ok) {
          const data = await response.json();
          setProfile(prev => ({
            ...prev,
            collegeName: data.collegeName || "Mumbai Institute of Technology", // Fallback or current default
            university: data.university || "Mumbai University",
            officerEmail: data.email,
            location: data.location || "Mumbai, Maharashtra",
            // Map other fields if they exist in DB, otherwise keep defaults or empty
          }));
        }
      } catch (error) {
        console.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [collegeEmail]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollegeSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              College Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your college information and settings
            </p>
          </div>
          <Button
            variant={isEditing ? "forest" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save size={16} />
                Save Changes
              </>
            ) : (
              <>
                <Edit size={16} />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-forest text-center">
              <div className="w-24 h-24 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center shadow-medium">
                <Building2 className="w-12 h-12 text-primary-foreground" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                {profile.collegeName}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                {profile.university}
              </p>

              <div className="space-y-3 text-left pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-sage" />
                  <span className="text-muted-foreground">{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-sage" />
                  <span className="text-muted-foreground">{profile.officerEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-sage" />
                  <span className="text-muted-foreground">{profile.officerPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Form */}
          <div className="lg:col-span-2">
            <div className="card-forest">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                College Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name</Label>
                  <Input
                    id="collegeName"
                    value={profile.collegeName}
                    onChange={(e) =>
                      setProfile({ ...profile, collegeName: e.target.value })
                    }
                    disabled={!isEditing}
                    className="input-forest"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={profile.university}
                    onChange={(e) =>
                      setProfile({ ...profile, university: e.target.value })
                    }
                    disabled={!isEditing}
                    className="input-forest"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                    disabled={!isEditing}
                    className="input-forest"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalStudents">Total Students</Label>
                  <Input
                    id="totalStudents"
                    value={profile.totalStudents}
                    onChange={(e) =>
                      setProfile({ ...profile, totalStudents: e.target.value })
                    }
                    disabled={!isEditing}
                    className="input-forest"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    disabled={!isEditing}
                    className="input-forest"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="courses">Courses Offered</Label>
                  <Textarea
                    id="courses"
                    value={profile.courses}
                    onChange={(e) =>
                      setProfile({ ...profile, courses: e.target.value })
                    }
                    disabled={!isEditing}
                    className="input-forest"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                  Placement Officer Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="officerName">Officer Name</Label>
                    <Input
                      id="officerName"
                      value={profile.officerName}
                      onChange={(e) =>
                        setProfile({ ...profile, officerName: e.target.value })
                      }
                      disabled={!isEditing}
                      className="input-forest"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="officerEmail">Email</Label>
                    <Input
                      id="officerEmail"
                      value={profile.officerEmail}
                      onChange={(e) =>
                        setProfile({ ...profile, officerEmail: e.target.value })
                      }
                      disabled={!isEditing}
                      className="input-forest"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="officerPhone">Phone</Label>
                    <Input
                      id="officerPhone"
                      value={profile.officerPhone}
                      onChange={(e) =>
                        setProfile({ ...profile, officerPhone: e.target.value })
                      }
                      disabled={!isEditing}
                      className="input-forest"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeProfile;
