
import {SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarFooter} from "@/components/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <div className="flex flex-col items-center pt-4 pb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://picsum.photos/200/200" alt="Guest User"/>
                <AvatarFallback>GU</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium mt-2">Guest User</p>
            </div>
          </SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/">Home</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/interview">Interview</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/resume">Resume</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/jobs">Jobs</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/profile">Profile</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings">Settings</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/progress">Progress</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <p className="text-xs text-muted-foreground px-2">© 2025 InterviewGPT</p>
            <div className="bg-secondary p-2 rounded-md mt-2">
              <p className="text-xs font-semibold">Pro Tip</p>
              <p className="text-xs text-muted-foreground">Practice makes perfect. The more you interview, the better you'll get!</p>
            </div>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-4">
        {/* Main content area */}
        <h1 className="text-2xl font-bold">Welcome to InterviewGPT</h1>
        <p>This is the main content area of the application.</p>
      </div>
    </SidebarProvider>
  );
}

    