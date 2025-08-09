import React, { useMemo, useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import logo from "@/assets/huisraad-logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, Users, Wrench, Plus } from "lucide-react";

interface AgentRow {
  id: string;
  title: string;
  platform: string;
  mode: "widget" | "streaming";
  users: number;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  agents: number;
  lastLogin?: string;
}

interface PlatformRow {
  id: string;
  name: string;
  url: string;
  active: boolean;
  apiKeyMasked: string;
  agents: number;
}

const AdminDashboard: React.FC = () => {
  useSEO({
    title: "Admin Dashboard - Huisraad Agents",
    description: "Beheer agents, gebruikers en Langflow platforms in het admin dashboard.",
    canonicalPath: "/admin",
  });

  const [userName] = useState<string>("");

  // Section state
  type Section = "none" | "agents" | "users" | "platforms" | "create";
  const initialSection = ((): Section => {
    const s = new URLSearchParams(window.location.search).get("section");
    return (s === "agents" || s === "users" || s === "platforms" || s === "create") ? (s as Section) : "none";
  })();
  const [section, setSection] = useState<Section>(initialSection);

  // Modal state
  const [editAgentOpen, setEditAgentOpen] = useState(false);
  const [inviteUserOpen, setInviteUserOpen] = useState(false);
  const [manageUserFlowsOpen, setManageUserFlowsOpen] = useState(false);
  const [addPlatformOpen, setAddPlatformOpen] = useState(false);

  // Placeholder data (kept empty, ready for integration)
  const agents: AgentRow[] = useMemo(() => [], []);
  const users: UserRow[] = useMemo(() => [], []);
  const platforms: PlatformRow[] = useMemo(() => [], []);

  // SHARED FUNCTIONS (placeholders)
  function logout() {
    console.log("TODO: POST /api/auth/logout");
    window.location.href = "/login";
  }

  function showSection(s: Exclude<Section, "none">) {
    console.log("Show section:", s);
    setSection(s);
  }

  function hideAllSections() {
    setSection("none");
  }

  // AGENT MANAGEMENT placeholders
  function loadAllAgents() {
    console.log("TODO: GET /api/flows (admin)");
  }
  function editAgent(agentId: string) {
    console.log("TODO: GET /api/flows/" + agentId);
    setEditAgentOpen(true);
  }
  function deleteAgent(agentId: string) {
    if (confirm("Weet je zeker dat je deze agent wilt verwijderen?")) {
      console.log("TODO: DELETE /api/flows/" + agentId);
    }
  }
  function createAgent(formData: FormData) {
    console.log("TODO: POST /api/flows", Object.fromEntries(formData));
  }

  // USER MANAGEMENT placeholders
  function loadAllUsers() {
    console.log("TODO: GET /api/users (admin)");
  }
  function inviteUser(email: string, name: string, selectedFlows: string[]) {
    console.log("TODO: POST /api/users/invite", { email, name, flows: selectedFlows });
  }
  function manageUserFlows(userId: string) {
    console.log("TODO: GET /api/users/" + userId + "/flows");
    setManageUserFlowsOpen(true);
  }
  function saveUserFlows(userId: string, flowIds: string[]) {
    console.log("TODO: PUT /api/users/" + userId + "/flows", flowIds);
  }
  function deleteUser(userId: string) {
    if (confirm("Weet je zeker dat je deze gebruiker wilt verwijderen?")) {
      console.log("TODO: DELETE /api/users/" + userId);
    }
  }

  // PLATFORM MANAGEMENT placeholders
  function loadPlatforms() {
    console.log("TODO: GET /api/platforms");
  }
  function addPlatform(name: string, url: string, apiKey: string) {
    console.log("TODO: POST /api/platforms", { name, url, apiKey });
  }
  function editPlatform(platformId: string) {
    console.log("TODO: GET /api/platforms/" + platformId);
    setAddPlatformOpen(true);
  }
  function deletePlatform(platformId: string) {
    if (confirm("Weet je zeker dat je dit platform wilt verwijderen?")) {
      console.log("TODO: DELETE /api/platforms/" + platformId);
    }
  }

  // CREATE AGENT form handling
  function onCreateAgentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    createAgent(fd);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 border-b border-border bg-background/80 backdrop-blur p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <img src={logo} alt="Huisraad logo" className="h-12" />
          <div className="flex items-center gap-4">
            <span id="userName" className="text-sm text-muted-foreground">{userName}</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Super User</span>
            <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground">Uitloggen</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <section className="mb-12">
          <h1 className="text-2xl font-semibold mb-6">Management Dashboard</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button onClick={() => showSection("agents")} className="bg-card border border-border rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 text-primary grid place-items-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Agent Management</h3>
                  <p className="text-xs text-muted-foreground">Beheer alle agents</p>
                </div>
              </div>
            </button>

            <button onClick={() => showSection("users")} className="bg-card border border-border rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 text-primary grid place-items-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">User Management</h3>
                  <p className="text-xs text-muted-foreground">Beheer gebruikers</p>
                </div>
              </div>
            </button>

            <button onClick={() => showSection("platforms")} className="bg-card border border-border rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 text-primary grid place-items-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Platform Management</h3>
                  <p className="text-xs text-muted-foreground">Langflow platforms</p>
                </div>
              </div>
            </button>

            <button onClick={() => setSection("create")} className="bg-card border border-border rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 text-primary grid place-items-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Nieuwe Agent</h3>
                  <p className="text-xs text-muted-foreground">Agent aanmaken</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* AGENT MANAGEMENT SECTION */}
        {section === "agents" && (
          <section id="agentsSection" className="management-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Agent Management</h2>
              <button onClick={hideAllSections} className="text-sm text-muted-foreground hover:text-foreground">← Terug</button>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" aria-sort="none">Agent</TableHead>
                    <TableHead className="cursor-pointer" aria-sort="none">Platform</TableHead>
                    <TableHead className="cursor-pointer" aria-sort="none">Mode</TableHead>
                    <TableHead className="cursor-pointer" aria-sort="none">Gebruikers</TableHead>
                    <TableHead>Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">Geen agents gevonden</TableCell>
                    </TableRow>
                  ) : (
                    agents.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>{a.title}</TableCell>
                        <TableCell>{a.platform}</TableCell>
                        <TableCell>{a.mode === "streaming" ? "🚀 Streaming" : "Widget"}</TableCell>
                        <TableCell>{a.users}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="secondary" size="sm" onClick={() => editAgent(a.id)}>Bewerken</Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteAgent(a.id)}>Verwijderen</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
                <TableCaption>Pagination ready</TableCaption>
              </Table>
            </div>

            {/* Edit Agent Modal */}
            <Dialog open={editAgentOpen} onOpenChange={setEditAgentOpen}>
              <DialogContent className="bg-card border border-border">
                <DialogHeader>
                  <DialogTitle>Agent Bewerken</DialogTitle>
                </DialogHeader>
                <form id="editAgentForm" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titel</label>
                    <Input id="editTitle" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitel</label>
                    <Input id="editSubtitle" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <select id="editPlatform" className="w-full p-3 border border-border rounded-lg" required>
                      {/* Dynamic options */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Flow UUID</label>
                    <Input id="editFlowUuid" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Interface Mode</label>
                    <select id="editInterfaceMode" className="w-full p-3 border border-border rounded-lg">
                      <option value="widget">Widget Mode</option>
                      <option value="streaming">🚀 Streaming Mode</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Kickoff Message</label>
                    <Textarea id="editKickoffMessage" className="h-24" />
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" form="editAgentForm">Opslaan</Button>
                  <Button variant="secondary" onClick={() => setEditAgentOpen(false)}>Annuleren</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        )}

        {/* USER MANAGEMENT SECTION */}
        {section === "users" && (
          <section id="usersSection" className="management-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex gap-3">
                <Button onClick={() => setInviteUserOpen(true)}>+ Gebruiker Uitnodigen</Button>
                <button onClick={hideAllSections} className="text-sm text-muted-foreground hover:text-foreground">← Terug</button>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" aria-sort="none">Gebruiker</TableHead>
                    <TableHead className="cursor-pointer" aria-sort="none">Email</TableHead>
                    <TableHead className="cursor-pointer" aria-sort="none">Agents</TableHead>
                    <TableHead className="cursor-pointer" aria-sort="none">Laatste Login</TableHead>
                    <TableHead>Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">Geen gebruikers gevonden</TableCell>
                    </TableRow>
                  ) : (
                    users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.agents}</TableCell>
                        <TableCell>{u.lastLogin ?? "—"}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="secondary" size="sm" onClick={() => manageUserFlows(u.id)}>Agents beheren</Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteUser(u.id)}>Verwijderen</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
                <TableCaption>Pagination ready</TableCaption>
              </Table>
            </div>

            {/* Invite User Modal */}
            <Dialog open={inviteUserOpen} onOpenChange={setInviteUserOpen}>
              <DialogContent className="bg-card border border-border">
                <DialogHeader>
                  <DialogTitle>Gebruiker Uitnodigen</DialogTitle>
                </DialogHeader>
                <form id="inviteUserForm" className="space-y-4" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); inviteUser(String(f.get("inviteEmail")), String(f.get("inviteName")), []); }}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input id="inviteEmail" name="inviteEmail" type="email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Naam</label>
                    <Input id="inviteName" name="inviteName" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Agents Toewijzen</label>
                    <div id="agentCheckboxes" className="space-y-2 max-h-32 overflow-y-auto border border-border rounded-lg p-3">
                      {/* Dynamic checkboxes */}
                    </div>
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" form="inviteUserForm">Uitnodiging Versturen</Button>
                  <Button variant="secondary" onClick={() => setInviteUserOpen(false)}>Annuleren</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Manage User Flows Modal */}
            <Dialog open={manageUserFlowsOpen} onOpenChange={setManageUserFlowsOpen}>
              <DialogContent className="bg-card border border-border">
                <DialogHeader>
                  <DialogTitle>Agents Beheren</DialogTitle>
                </DialogHeader>
                <div id="userFlowCheckboxes" className="space-y-3 max-h-64 overflow-y-auto">
                  {/* Dynamic checkboxes */}
                </div>
                <DialogFooter>
                  <Button onClick={() => saveUserFlows("userId", [])}>Opslaan</Button>
                  <Button variant="secondary" onClick={() => setManageUserFlowsOpen(false)}>Annuleren</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        )}

        {/* PLATFORM MANAGEMENT SECTION */}
        {section === "platforms" && (
          <section id="platformsSection" className="management-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Platform Management</h2>
              <div className="flex gap-3">
                <Button onClick={() => setAddPlatformOpen(true)}>+ Platform Toevoegen</Button>
                <button onClick={hideAllSections} className="text-sm text-muted-foreground hover:text-foreground">← Terug</button>
              </div>
            </div>

            <div id="platformsGrid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platforms.length === 0 ? (
                <div className="text-center text-muted-foreground col-span-full">Geen platforms toegevoegd</div>
              ) : (
                platforms.map((p) => (
                  <div key={p.id} className="platform-card bg-card border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">{p.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${p.active ? "bg-green-500" : "bg-muted"}`}></div>
                        <span className="text-xs text-muted-foreground">{p.active ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">API Key:</span>
                        <span className="font-mono text-xs">{p.apiKeyMasked}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Agents:</span>
                        <span>{p.agents} agents</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="secondary" className="flex-1" onClick={() => editPlatform(p.id)}>Bewerken</Button>
                      <Button variant="destructive" className="flex-1" onClick={() => deletePlatform(p.id)}>Verwijderen</Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add/Edit Platform Modal */}
            <Dialog open={addPlatformOpen} onOpenChange={setAddPlatformOpen}>
              <DialogContent className="bg-card border border-border">
                <DialogHeader>
                  <DialogTitle>Platform Toevoegen</DialogTitle>
                </DialogHeader>
                <form id="addPlatformForm" className="space-y-4" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); addPlatform(String(f.get("platformName")), String(f.get("platformUrl")), String(f.get("platformApiKey"))); }}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform Naam</label>
                    <Input id="platformName" name="platformName" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Host URL</label>
                    <Input id="platformUrl" name="platformUrl" type="url" placeholder="https://your-langflow.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <Input id="platformApiKey" name="platformApiKey" type="password" required />
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" form="addPlatformForm">Platform Toevoegen</Button>
                  <Button variant="secondary" onClick={() => setAddPlatformOpen(false)}>Annuleren</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        )}

        {/* CREATE AGENT SECTION */}
        {section === "create" && (
          <section id="createAgentSection" className="management-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Nieuwe Agent Aanmaken</h2>
              <button onClick={hideAllSections} className="text-sm text-muted-foreground hover:text-foreground">← Terug</button>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 max-w-2xl">
              <form id="createAgentForm" className="space-y-4" onSubmit={onCreateAgentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Agent Titel</label>
                    <Input id="agentTitle" name="agentTitle" placeholder="Cense Sales Agent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subtitel</label>
                    <Input id="agentSubtitle" name="agentSubtitle" placeholder="AI-gestuurde verkoop assistent" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Icon (emoji)</label>
                    <Input id="agentIcon" name="agentIcon" defaultValue="🤖" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <select id="agentPlatform" name="agentPlatform" className="w-full p-3 border border-border rounded-lg" required>
                      <option value="">Selecteer platform...</option>
                      {/* Dynamic options */}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Flow UUID</label>
                  <Input id="agentFlowUuid" name="agentFlowUuid" placeholder="62f396d2-3e45-4265-b10c-b18a63cd2b07" required />
                  <p className="text-xs text-muted-foreground mt-1">De UUID van de flow in het geselecteerde Langflow platform</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interface Mode</label>
                  <select id="agentInterfaceMode" name="agentInterfaceMode" className="w-full p-3 border border-border rounded-lg">
                    <option value="widget">Widget Mode (Embedded)</option>
                    <option value="streaming">🚀 Ultra-Fast Streaming Mode</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">Widget = embedded in website | Streaming = ultra-fast dedicated interface</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Client Logo URL (optioneel)</label>
                  <Input id="agentLogoUrl" name="agentLogoUrl" type="url" placeholder="https://client.com/logo.png" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Kickoff Message</label>
                  <Textarea id="agentKickoffMessage" name="agentKickoffMessage" className="h-24" placeholder="Welkom! Hoe kan ik je helpen?" required />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">Agent Aanmaken</Button>
                  <Button type="button" variant="secondary" className="flex-1" onClick={hideAllSections}>Annuleren</Button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* CLIENT FLOWS SECTION (placeholder for future parity) */}
        {section === "none" && (
          <section id="clientFlowsSection">
            <h2 className="text-xl font-semibold mb-6">Beschikbare Agents</h2>
            <div id="adminFlowsList" className="space-y-3">
              {/* Same as client dashboard flows - filled by backend later */}
              <div className="text-muted-foreground">Geen agents beschikbaar</div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
