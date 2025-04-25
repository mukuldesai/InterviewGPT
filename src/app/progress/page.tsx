'use client';

import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const ProgressPage = () => {
  // Dummy progress data
  const progressData = [
    {name: 'Week 1', score: 3.5},
    {name: 'Week 2', score: 4.0},
    {name: 'Week 3', score: 4.2},
    {name: 'Week 4', score: 4.5},
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Progress Tracking</h1>

      <Card>
        <CardHeader>
          <CardTitle>Interview Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={progressData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis domain={[0, 5]}/>
              <Tooltip/>
              <Area type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8"/>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
