import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  LogOut, 
  FileText, 
  Calendar, 
  Upload, 
  Crown, 
  Settings,
  Search,
  Filter,
  MoreVertical
} from "lucide-react";
import { toast } from "sonner";

interface Case {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  files: File[];
  status: 'active' | 'pending' | 'closed';
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isPro: boolean;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCase, setNewCase] = useState({ title: "", description: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    // Check authentication
    const currentUser = localStorage.getItem('samanyay_current_user');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(currentUser);
    setUser(userData);

    // Load user's cases
    const userCases = JSON.parse(localStorage.getItem(`samanyay_cases_${userData.id}`) || '[]');
    setCases(userCases);

    // Create demo user and case for demonstration
    if (userData.email === 'demo@lawfirm.com' && userCases.length === 0) {
      const demoCase: Case = {
        id: 'demo-1',
        title: 'Smith vs. Johnson Contract Dispute',
        description: 'Commercial contract dispute regarding breach of terms in software development agreement. Client seeks damages for delayed delivery and non-conforming deliverables.',
        createdAt: new Date().toISOString(),
        files: [],
        status: 'active'
      };
      setCases([demoCase]);
      localStorage.setItem(`samanyay_cases_${userData.id}`, JSON.stringify([demoCase]));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('samanyay_current_user');
    navigate('/');
    toast.success("Logged out successfully");
  };

  const handleCreateCase = () => {
    if (!newCase.title.trim() || !newCase.description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const caseData: Case = {
      id: Date.now().toString(),
      title: newCase.title,
      description: newCase.description,
      createdAt: new Date().toISOString(),
      files: selectedFiles,
      status: 'active'
    };

    const updatedCases = [...cases, caseData];
    setCases(updatedCases);
    localStorage.setItem(`samanyay_cases_${user?.id}`, JSON.stringify(updatedCases));

    setNewCase({ title: "", description: "" });
    setSelectedFiles([]);
    setIsCreateDialogOpen(false);
    toast.success("Case created successfully!");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const filteredCases = cases.filter(case_ =>
    case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    case_.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl">Samanyay</span>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Dashboard
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">Welcome back,</span>
              <span className="font-medium">{user.firstName}</span>
              {user.isPro && (
                <Crown className="h-4 w-4 text-warning" />
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/upgrade')}
              className="text-primary hover:bg-accent hidden sm:flex"
            >
              {user.isPro ? (
                <>
                  <Crown className="mr-2 h-4 w-4" />
                  Pro Account
                </>
              ) : (
                "Upgrade to Pro"
              )}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your legal cases and documents in one secure platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card bg-gradient-card border-0 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{cases.length}</div>
              <p className="text-xs text-muted-foreground">
                {cases.filter(c => c.status === 'active').length} active cases
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card border-0 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Type</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {user.isPro ? "Pro" : "Free"}
              </div>
              <p className="text-xs text-muted-foreground">
                {user.isPro ? "Premium features enabled" : "Upgrade for more features"}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card border-0 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Legal professional
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cases Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Your Cases</h2>
              <p className="text-muted-foreground">
                Organize and track your legal cases efficiently.
              </p>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:shadow-glow transition-bounce">
                  <Plus className="mr-2 h-4 w-4" />
                  New Case
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md shadow-elegant">
                <DialogHeader>
                  <DialogTitle>Create New Case</DialogTitle>
                  <DialogDescription>
                    Add a new case to your dashboard. You can upload documents and manage details later.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="case-title">Case Title</Label>
                    <Input
                      id="case-title"
                      placeholder="e.g., Smith vs. Johnson Contract Dispute"
                      value={newCase.title}
                      onChange={(e) => setNewCase(prev => ({ ...prev, title: e.target.value }))}
                      className="transition-smooth focus:shadow-elegant"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="case-description">Description</Label>
                    <Textarea
                      id="case-description"
                      placeholder="Brief description of the case..."
                      value={newCase.description}
                      onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                      className="transition-smooth focus:shadow-elegant"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="case-files">Upload Documents (Optional)</Label>
                    <div className="mt-2">
                      <Input
                        id="case-files"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="transition-smooth"
                      />
                      {selectedFiles.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            {selectedFiles.length} file(s) selected
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateCase}
                    className="bg-gradient-primary hover:shadow-glow"
                  >
                    Create Case
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-smooth focus:shadow-elegant"
              />
            </div>
            <Button variant="outline" className="hover:bg-accent transition-smooth">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Cases Grid */}
          {filteredCases.length === 0 ? (
            <Card className="shadow-card bg-gradient-card border-0 text-center py-12">
              <CardContent>
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {cases.length === 0 ? "No cases yet" : "No cases found"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {cases.length === 0 
                    ? "Create your first case to get started with case management."
                    : "Try adjusting your search terms."
                  }
                </p>
                {cases.length === 0 && (
                  <Button 
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-primary hover:shadow-glow"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Case
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCases.map((case_) => (
                <Card key={case_.id} className="shadow-card bg-gradient-card border-0 hover-lift group">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-smooth">
                          {case_.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getStatusColor(case_.status)} variant="secondary">
                            {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(case_.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3 leading-relaxed">
                      {case_.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Upload className="mr-1 h-3 w-3" />
                        {case_.files.length} files
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-primary hover:text-primary-foreground transition-smooth"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;