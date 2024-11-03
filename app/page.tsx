"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icons } from "@/components/icons";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      router.push("/auth/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="p-4 flex justify-end items-center gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <Icons.logout className="h-5 w-5" />
          <span className="sr-only">Sign out</span>
        </Button>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary rounded-full p-3">
              <Icons.user className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome!</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <p className="text-lg mb-6">
            You're now signed in to your account. This is your protected dashboard
            where you can start building your application.
          </p>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="h-24">
                Update Profile
              </Button>
              <Button variant="outline" className="h-24">
                View Settings
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}