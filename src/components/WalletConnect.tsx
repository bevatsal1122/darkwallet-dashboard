
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, Copy, ExternalLink } from "lucide-react";

interface WalletConnectProps {
  networkType: "EVM" | "Solana";
}

const WalletConnect: React.FC<WalletConnectProps> = ({ networkType }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connecting to wallet
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      // Generate a mock wallet address
      setWalletAddress(
        networkType === "EVM"
          ? "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
          : Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
      );
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-6">{networkType} Network</h3>
      
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div 
            key="connect"
            className="flex flex-col items-center justify-center flex-grow gap-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 rounded-full bg-secondary/60 backdrop-blur-md mb-4">
              <Wallet className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-lg text-center">Connect your {networkType} wallet</h3>
            <p className="text-muted-foreground text-sm text-center mb-4">
              Connect your wallet to deposit your {networkType === "EVM" ? "ETH and ERC-20 tokens" : "SOL and SPL tokens"}
            </p>
            <Button 
              onClick={handleConnect} 
              size="lg"
              disabled={isConnecting}
              className="relative overflow-hidden group"
            >
              {isConnecting ? (
                <span className="flex items-center">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                  Connecting...
                </span>
              ) : (
                <>
                  <span className="relative z-10">Connect Wallet</span>
                  <motion.div
                    className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            key="connected"
            className="flex flex-col h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-2 bg-green-500/20 rounded-full mr-3">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-green-400 font-medium">Wallet Connected</span>
            </div>

            <div className="glass-panel rounded-lg p-4 mb-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Wallet Address</span>
                <div className="flex items-center">
                  <span className="text-sm font-mono truncate flex-grow">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </span>
                  <button 
                    onClick={handleCopyAddress}
                    className="p-1.5 hover:bg-white/5 rounded-md transition-colors ml-2"
                    aria-label="Copy address"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                  <a 
                    href="#" 
                    className="p-1.5 hover:bg-white/5 rounded-md transition-colors ml-1"
                    aria-label="View on explorer"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-grow" />

            <div className="flex flex-col mt-auto">
              <Button 
                variant="secondary" 
                onClick={handleDisconnect}
                className="w-full"
              >
                Disconnect Wallet
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletConnect;
