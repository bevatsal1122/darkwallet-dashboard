
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Timer, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EventProps {
  className?: string;
}

const UpcomingEvents: React.FC<EventProps> = ({ className = "" }) => {
  // Mock data for upcoming expirations
  const upcomingEvents = [
    {
      id: "event-1",
      title: "Lakers vs Warriors",
      type: "Game Winner",
      date: "May 12, 2024",
      timeRemaining: "2 days",
      position: "Lakers Win",
      allocation: 25
    },
    {
      id: "event-2",
      title: "LeBron James",
      type: "Player Points",
      date: "May 12, 2024",
      timeRemaining: "2 days",
      position: "Over 30.5",
      allocation: 15
    },
    {
      id: "event-3",
      title: "Celtics vs Bucks",
      type: "Game Winner",
      date: "May 15, 2024",
      timeRemaining: "5 days",
      position: "Celtics Win",
      allocation: 20
    }
  ];

  // Mock data for NBA stats
  const nbaStats = {
    totalMarkets: 124,
    avgSuccessRate: 68,
    avgROI: 14.2,
    bestPerforming: "Game Winner Markets"
  };

  return (
    <motion.div 
      className={`glass-panel p-4 rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">NBA Markets</h2>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="upcoming" className="mt-0">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden border-0 bg-card/50 hover:bg-card/80 transition-all duration-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/20 text-primary-foreground">
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">Position: {event.position}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs text-amber-400">
                        <Timer size={12} className="mr-1" />
                        <span>Expires in {event.timeRemaining}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{event.allocation}% allocated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-0">
          <div className="grid grid-cols-2 gap-4">
            <Card className="overflow-hidden border-0 bg-card/50">
              <CardContent className="p-4">
                <h3 className="text-xs text-muted-foreground mb-1">Total NBA Markets</h3>
                <p className="text-xl font-bold">{nbaStats.totalMarkets}</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 bg-card/50">
              <CardContent className="p-4">
                <h3 className="text-xs text-muted-foreground mb-1">Success Rate</h3>
                <p className="text-xl font-bold text-green-400">{nbaStats.avgSuccessRate}%</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 bg-card/50">
              <CardContent className="p-4">
                <h3 className="text-xs text-muted-foreground mb-1">Average ROI</h3>
                <p className="text-xl font-bold text-green-400">+{nbaStats.avgROI}%</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 bg-card/50">
              <CardContent className="p-4">
                <h3 className="text-xs text-muted-foreground mb-1">Best Performance</h3>
                <p className="text-xl font-bold">{nbaStats.bestPerforming}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default UpcomingEvents;
