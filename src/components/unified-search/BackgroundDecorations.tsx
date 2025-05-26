
import { motion } from "framer-motion";

const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Enhanced Background decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full opacity-10 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-indigo-300 to-pink-300 rounded-full opacity-10 animate-pulse delay-1000 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-5 animate-pulse delay-500 blur-3xl"></div>
      
      {/* Floating particles */}
      <div className="absolute top-32 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-48 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-bounce delay-300"></div>
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-indigo-400 rounded-full opacity-50 animate-bounce delay-700"></div>
    </div>
  );
};

export default BackgroundDecorations;
