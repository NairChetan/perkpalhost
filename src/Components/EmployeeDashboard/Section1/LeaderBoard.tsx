import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const ScrollBox = styled(Box)({
  flexGrow: 1,
  overflowY: "hidden",
  marginTop: 1,
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#4F0A3A",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch leaderboard data from API
    axios.get<ApiResponse>('http://localhost:8080/api/v1/employee/leaderboard')
      .then(response => {
        // Check the structure here
        console.log('API Response:', response.data);
        setLeaderboardData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
        setError('Error fetching leaderboard data');
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#4F0A3A",
        borderRadius: 7,
        padding: 2,
        color: "white",
        width: "100%",
        height: "100%", // Adjusted height to make it smaller
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" component="div" gutterBottom>
        Meet Our Stars!
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <ScrollBox>
        {leaderboardData.slice(0, 3).map((user, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#5D1049",
              borderRadius: 2,
              padding: 1,
              marginBottom: 1,
            }}
          >
            <Avatar
              src={user.photoUrl}
              alt={user.fullName}
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">{user.fullName}</Typography>
              <Typography variant="body2">{user.departmentName}</Typography>
            </Box>
            <Typography variant="h6">{user.totalPoints}</Typography>
          </Box>
        ))}
      </ScrollBox>
    </Box>
  );
};

export default Leaderboard;
