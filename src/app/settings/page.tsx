import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const SettingsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
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