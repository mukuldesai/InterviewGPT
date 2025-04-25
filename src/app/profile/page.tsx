'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useRouter} from 'next/navigation';
import {ArrowLeft} from "lucide-react";

const ProfilePage = () => {
  // Dummy user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    experience: '5+ years',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
  };

  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
            <Button variant="ghost" onClick={handleBackToHome}>
              <ArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://picsum.photos/id/225/200/200" alt={userData.name}/>
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{userData.name}</p>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <p>Location: {userData.location}</p>
            <p>Experience: {userData.experience}</p>
            <p>Skills: {userData.skills.join(', ')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
