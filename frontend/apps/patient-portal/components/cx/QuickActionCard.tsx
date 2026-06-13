"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function QuickActionCard({title,subtitle}:{title:string,subtitle:string}){
  return (
    <motion.div whileHover={{ y: -4 }} className="p-3 bg-white rounded-[12px] shadow-sm hover:shadow-md transition-shadow">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </motion.div>
  )
}
