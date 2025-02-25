"use client";

import React, { useState } from 'react';
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
  FormControlLabel,
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

  const handleMarketSelect = (market: string) => {
    setTradeData({ ...tradeData, mkt: market });
    setShowMarketSelector(false);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedPositions(currentPositions.map(position => position.id));
    } else {
      setSelectedPositions([]);
    }
  };

  const handlePositionSelect = (id: number) => {
    setSelectedPositions(prev => {
      if (prev.includes(id)) {
        return prev.filter(posId => posId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div>
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
      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: 'white', marginBottom: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Symbol</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>MKT</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Qty</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Value</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Action</TableCell>
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
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
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
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <TextField
                  value={tradeData.qty}
                  onChange={(e) => setTradeData({ ...tradeData, qty: e.target.value })}
                  variant="standard"
                  sx={{
                    input: { color: 'white' },
                    '&:before': { borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {showMarketSelector && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: 'white', marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>MKT</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Price</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>24 H</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>VOL</TableCell>
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
                  <TableCell
                    sx={{
                      color: market.change24h.startsWith('-') ? '#ff4d4d' : '#4caf50',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {market.change24h}
                  </TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    {market.volume}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Typography
        variant="h6"
        sx={{
          color: 'white',
          marginBottom: 2,
          marginTop: 4,
          fontWeight: 500,
        }}
      >
        Current Position
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Checkbox
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-checked': {
                      color: 'white',
                    },
                  }}
                  indeterminate={selectedPositions.length > 0 && selectedPositions.length < currentPositions.length}
                  checked={selectedPositions.length === currentPositions.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Symbol</TableCell>
              <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPositions.map((position) => (
              <TableRow
                key={position.id}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
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
                    onChange={() => handlePositionSelect(position.id)}
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
  );
}