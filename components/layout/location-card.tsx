"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
}

export default function LocationCard({ name, address, phone, mapUrl }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">{name}</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-rose-500 mt-1" />
              <div>
                <p className="text-gray-700">{address}</p>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-500 hover:text-rose-600 text-sm mt-1 inline-block"
                >
                  Open in Maps
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-rose-500" />
              <a
                href={`tel:${phone}`}
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                {phone}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}