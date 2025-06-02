
import { motion } from "framer-motion";

const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Enhanced Background Geometric Shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-300/20 via-purple-300/15 to-pink-300/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-indigo-300/20 via-cyan-300/15 to-blue-300/20 rounded-full blur-2xl"
      />
      
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/10 via-blue-200/8 to-purple-200/10 rounded-full blur-3xl"
      />

      {/* Advanced Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-2 h-2 rounded-full ${
              index % 3 === 0 ? 'bg-blue-400/60' : 
              index % 3 === 1 ? 'bg-purple-400/50' : 'bg-pink-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, rgba(59, 130, 246, 0.1) 50%, transparent 55%),
              linear-gradient(-45deg, transparent 45%, rgba(139, 92, 246, 0.1) 50%, transparent 55%)
            `,
            backgroundSize: '100px 100px'
          }}
          className="w-full h-full"
        />
      </div>

      {/* Mesh Gradient Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />
    </div>
  );
};

export default BackgroundDecorations;
