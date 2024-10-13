import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function for normally distributed random numbers
const generateNormalRandom = (mean, stdDev) => {
  let u1 = Math.random();
  let u2 = Math.random();
  let randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
  return mean + stdDev * randStdNormal;
};

const generateCumulativeSum = (arr) => {
  let sum = 0;
  return arr.map((value) => (sum += value));
};

// CNC Data Generation
const generateRandomDataForCNC = (numEntries) => {
  return {
    spindle_speed: Array.from({ length: numEntries }, () => generateNormalRandom(1200, 100).toFixed(2)),
    feed_rate: Array.from({ length: numEntries }, () => (100 + Math.random() * 200).toFixed(2)),
    tool_temperature: generateCumulativeSum(Array.from({ length: numEntries }, () => generateNormalRandom(200, 5).toFixed(2))),
    vibration_level: Array.from({ length: numEntries }, () => generateNormalRandom(1.5, 0.2).toFixed(2)),
    power_consumption: Array.from({ length: numEntries }, () => generateNormalRandom(5, 0.5).toFixed(2)),
    tool_wear: generateCumulativeSum(Array.from({ length: numEntries }, () => Math.max(0, generateNormalRandom(0, 1)).toFixed(2))),
  };
};

// Injection Molding Data Generation
const generateRandomDataForINJECTION = (numEntries) => {
  return {
    injection_pressure: Array.from({ length: numEntries }, () => generateNormalRandom(100, 10).toFixed(2)),
    melt_temperature: Array.from({ length: numEntries }, () => (180 + Math.random() * 40).toFixed(2)),
    clamping_force: Array.from({ length: numEntries }, () => generateNormalRandom(50, 5).toFixed(2)),
    cycle_time: Array.from({ length: numEntries }, () => generateNormalRandom(30, 3).toFixed(2)),
    screw_speed: Array.from({ length: numEntries }, () => (50 + Math.random() * 100).toFixed(2)),
    cooling_time: Array.from({ length: numEntries }, () => generateNormalRandom(20, 2).toFixed(2)),
    hydraulic_pressure: Array.from({ length: numEntries }, () => generateNormalRandom(3000, 200).toFixed(2)),
  };
};

// Lathe Data Generation
const generateRandomDataForLATHE = (numEntries) => {
  return {
    spindle_speed: Array.from({ length: numEntries }, () => generateNormalRandom(800, 100).toFixed(2)),
    feed_rate: Array.from({ length: numEntries }, () => (0.1 + Math.random() * 0.4).toFixed(2)),
    depth_of_cut: Array.from({ length: numEntries }, () => generateNormalRandom(2, 0.5).toFixed(2)),
    tool_wear: generateCumulativeSum(Array.from({ length: numEntries }, () => Math.max(0, generateNormalRandom(0, 1)).toFixed(2))),
    vibration_level: Array.from({ length: numEntries }, () => generateNormalRandom(1.2, 0.1).toFixed(2)),
    cutting_force: Array.from({ length: numEntries }, (_, i) => (generateNormalRandom(800, 100) * generateNormalRandom(2, 0.5) * 0.5).toFixed(2)),
  };
};

// 3D Printer Data Generation
const generateRandomDataFor3DPRINTER = (numEntries) => {
  return {
    layer_height: Array.from({ length: numEntries }, () => (0.1 + Math.random() * 0.4).toFixed(2)),
    print_speed: Array.from({ length: numEntries }, () => (30 + Math.random() * 70).toFixed(2)),
    nozzle_temperature: Array.from({ length: numEntries }, () => generateNormalRandom(200, 10).toFixed(2)),
    bed_temperature: Array.from({ length: numEntries }, () => generateNormalRandom(60, 5).toFixed(2)),
    filament_diameter: Array.from({ length: numEntries }, () => generateNormalRandom(1.75, 0.05).toFixed(2)),
  };
};

// Conveyor Belt Data Generation
const generateRandomDataForCONVEYOR = (numEntries) => {
  return {
    belt_speed: Array.from({ length: numEntries }, () => generateNormalRandom(1.5, 0.1).toFixed(2)),
    load_weight: Array.from({ length: numEntries }, () => (100 + Math.random() * 400).toFixed(2)),
    motor_current: Array.from({ length: numEntries }, (_, i) => (10 + (100 + Math.random() * 400) / 50).toFixed(2)),
    belt_tension: Array.from({ length: numEntries }, (_, i) => (200 + (100 + Math.random() * 400) * 0.5).toFixed(2)),
    belt_alignment_offset: Array.from({ length: numEntries }, () => generateNormalRandom(0, 0.5).toFixed(2)),
    pulley_rotation_speed: Array.from({ length: numEntries }, (_, i) => (generateNormalRandom(1.5, 0.1) * 60).toFixed(2)),
    ambient_temperature: Array.from({ length: numEntries }, () => generateNormalRandom(25, 2).toFixed(2)),
  };
};

export default function MachineDataGenerator() {
  const [cncData, setCNCData] = useState({});
  const [injectionData, setInjectionData] = useState({});
  const [latheData, setLatheData] = useState({});
  const [printerData, setPrinterData] = useState({});
  const [conveyorData, setConveyorData] = useState({});

  useEffect(() => {
    const numEntries = 100; // Number of data points to generate
    setCNCData(generateRandomDataForCNC(numEntries));
    setInjectionData(generateRandomDataForINJECTION(numEntries));
    setLatheData(generateRandomDataForLATHE(numEntries));
    setPrinterData(generateRandomDataFor3DPRINTER(numEntries));
    setConveyorData(generateRandomDataForCONVEYOR(numEntries));
  }, []);

  return (
    <div>
      You can display or work with the data here
    </div>
  );
}
