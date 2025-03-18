
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, Copy, ExternalLink } from "lucide-react";
import { usePrivyAuth } from "@/hooks/usePrivyAuth";

interface WalletConnectProps {
  networkType: "EVM" | "Solana";
}

const WalletConnect: React.FC<WalletConnectProps> = ({ networkType }) => {
  const { isAuthenticated, getUserWallet, createWallet } = usePrivyAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const privyWallet = getUserWallet();
  const walletAddress = privyWallet?.address || "";
  const isConnected = !!privyWallet;

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Use createWallet directly since linkWallet might not be available
      await createWallet();
      setIsConnecting(false);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    // Note: In Privy we don't typically disconnect embedded wallets
    console.log("Disconnect requested - not implemented for embedded wallets");
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If not authenticated with Privy, show a message
  if (!isAuthenticated) {
    return (
      <div className="glass-panel rounded-xl p-6 h-full flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold mb-4">{networkType} Network</h3>
        <p className="text-center text-muted-foreground">
          Please login to access your wallet
        </p>
      </div>
    );
  }

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
                    href={`https://etherscan.io/address/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer" 
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
