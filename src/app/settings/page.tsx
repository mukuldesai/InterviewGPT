'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation';
import {ArrowLeft} from "lucide-react";

const SettingsPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Settings</CardTitle>
            <Button variant="ghost" onClick={handleBackToHome}>
              <ArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" defaultValue="John Doe"/>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" defaultValue="john.doe@example.com"/>
          </div>
          <div>
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
