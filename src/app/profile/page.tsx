import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const ProfilePage = () => {
  // Dummy user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    experience: '5+ years',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://picsum.photos/id/225/200/200" alt={userData.name}/>
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <CardTitle>{userData.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p>Email: {userData.email}</p>
          <p>Location: {userData.location}</p>
          <p>Experience: {userData.experience}</p>
          <p>Skills: {userData.skills.join(', ')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
