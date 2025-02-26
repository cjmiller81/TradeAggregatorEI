"use client";

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
  Checkbox,
  Alert,
} from '@mui/material';

interface TradeData {
  symbol: string;
  mkt: string;
  qty: string;
  value: string;
  action: string;
}

interface MarketData {
  pair: string;
  price: string;
  change24h: string;
  volume: string;
}

interface CurrentPosition {
  id: number;
  symbol: string;
  qty: string;
}

const marketData: MarketData[] = [
  { pair: 'SOL/USD', price: '169.16', change24h: '-3.44%', volume: '36.3M' },
  { pair: 'SOL/USDT', price: '169.33', change24h: '-3.40%', volume: '3.93M' },
  { pair: 'SOL/BTC', price: '.001779', change24h: '-0.04%', volume: '2.93M' },
  { pair: 'SOL/USDC', price: '169.55', change24h: '-3.35%', volume: '4.12M' },
];

const currentPositions: CurrentPosition[] = [
  { id: 1, symbol: 'BTC', qty: '0.0050' },
  { id: 2, symbol: 'USDT', qty: '1,110.0000' },
  { id: 3, symbol: 'USD', qty: '10,000.0000' },
];

export function TradeTable() {
  const [tradeData, setTradeData] = useState<TradeData>({
    symbol: 'SOL',
    mkt: '',
    qty: '0',
    value: '',
    action: 'buy',
  });
  const [showMarketSelector, setShowMarketSelector] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [crossPairWarning, setCrossPairWarning] = useState<string | null>(null);

  // Function to extract the cross pair from a market pair
  const getCrossPair = (marketPair: string): string => {
    if (!marketPair) return '';
    const parts = marketPair.split('/');
    return parts.length > 1 ? parts[1] : '';
  };

  // Update selected positions when market changes
  useEffect(() => {
    if (!tradeData.mkt) {
      setSelectedPositions([]);
      setCrossPairWarning(null);
      return;
    }

    const crossPair = getCrossPair(tradeData.mkt);
    const matchingPosition = currentPositions.find(position => position.symbol === crossPair);
    
    if (matchingPosition) {
      setSelectedPositions([matchingPosition.id]);
      setCrossPairWarning(null);
    } else {
      setSelectedPositions([]);
      setCrossPairWarning(
        `Please select a different market, cross pair to trade against is not available in your Current Positions`
      );
    }
  }, [tradeData.mkt]);

  // Calculate value based on qty and selected market price
  useEffect(() => {
    if (!tradeData.mkt || !tradeData.qty) {
      setTradeData(prev => ({ ...prev, value: '' }));
      return;
    }

    const selectedMarket = marketData.find(market => market.pair === tradeData.mkt);
    if (!selectedMarket) {
      setTradeData(prev => ({ ...prev, value: '' }));
      return;
    }

    const price = parseFloat(selectedMarket.price);
    const qty = parseFloat(tradeData.qty.replace(/,/g, ''));

    if (isNaN(price) || isNaN(qty)) {
      setTradeData(prev => ({ ...prev, value: '' }));
      return;
    }

    const calculatedValue = (price * qty).toFixed(2);
    setTradeData(prev => ({ ...prev, value: calculatedValue }));
  }, [tradeData.mkt, tradeData.qty]);

  const handleMarketSelect = (market: string) => {
    setTradeData({ ...tradeData, mkt: market });
    setShowMarketSelector(false);
  };

  return (
    <div className="flex flex-row gap-4">
      {/* Current Position Table */}
      <div className="w-1/3">
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            marginBottom: 2,
            fontWeight: 500,
          }}
        >
          Current Position
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: 'white', width: '100%' }}>
          <Table sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '15%' }}>
                  {/* Removed the "Select All" checkbox */}
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '40%' }}>Symbol</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '45%' }}>Qty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPositions.map((position) => (
                <TableRow
                  key={position.id}
                  sx={{
                    backgroundColor: selectedPositions.includes(position.id) ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  }}
                >
                  <TableCell padding="checkbox" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Checkbox
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-checked': {
                          color: 'white',
                        },
                      }}
                      checked={selectedPositions.includes(position.id)}
                      disabled={true} // Disable user interaction
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    {position.symbol}
                  </TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    {position.qty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* New Position Table */}
      <div className="w-2/3">
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            marginBottom: 2,
            fontWeight: 500,
          }}
        >
          New Position
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: 'white', marginBottom: 3, width: '100%' }}>
          <Table sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '15%' }}>Symbol</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '18%' }}>MKT</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '19%', paddingLeft: '40px' }}>Qty</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '13%' }}>Value</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '15%' }}>Trade</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '20%' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <TextField
                    value={tradeData.symbol}
                    onChange={(e) => setTradeData({ ...tradeData, symbol: e.target.value })}
                    variant="standard"
                    sx={{
                      input: { color: 'white' },
                      '&:before': { borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '20px' }}>
                  <Button
                    onClick={() => setShowMarketSelector(!showMarketSelector)}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 0,
                      padding: '0 0 5px 0',
                      minWidth: '120px',
                      justifyContent: 'flex-start',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {tradeData.mkt || 'Select Market'}
                  </Button>
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '40px' }}>
                  <TextField
                    value={tradeData.qty}
                    onChange={(e) => setTradeData({ ...tradeData, qty: e.target.value })}
                    variant="standard"
                    fullWidth
                    sx={{
                      input: { color: 'white' },
                      '&:before': { borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
                      width: '100%',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <TextField
                    value={tradeData.value}
                    disabled
                    variant="standard"
                    sx={{
                      input: { color: 'white' },
                      '&:before': { borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
                      '& .MuiInputBase-input.Mui-disabled': {
                        color: 'white',
                        WebkitTextFillColor: 'white',
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Select
                    value={tradeData.action}
                    onChange={(e) => setTradeData({ ...tradeData, action: e.target.value })}
                    variant="standard"
                    sx={{
                      color: 'white',
                      '&:before': { borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
                      '& .MuiSelect-icon': { color: 'white' },
                    }}
                  >
                    <MenuItem value="buy">Buy</MenuItem>
                    <MenuItem value="sell">Sell</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#4caf50', // Brighter green color
                      color: 'white', // White text for better contrast
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#45a049', // Slightly darker green on hover
                      },
                    }}
                  >
                    SEND
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Warning message for missing cross pair */}
        {crossPairWarning && (
          <Typography 
            sx={{ 
              color: '#ff4d4d', 
              marginBottom: 2,
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {crossPairWarning}
          </Typography>
        )}

        {showMarketSelector && (
          <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: 'white', marginBottom: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '50%' }}>MKT</TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', width: '50%' }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marketData.map((market) => (
                  <TableRow
                    key={market.pair}
                    onClick={() => handleMarketSelect(market.pair)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    }}
                  >
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {market.pair}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      {market.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}