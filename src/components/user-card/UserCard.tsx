import {
  Card,
  Box,
  Avatar,
  Stack,
  Typography,
  SxProps,
  Theme
} from "@mui/material";

interface UserCardProps {
  src: string;
  name: string;
  followersCount: number;
  sx?: SxProps<Theme>;
}
export default ({ src, name, followersCount, sx }: UserCardProps) => (
  <Card sx={sx}>
    <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
      <Avatar sx={{ marginRight: 1 }} variant="rounded" src={src} />
      <Stack spacing={0.5}>
        <Typography fontWeight={700}>{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Followers Count: {followersCount ?? 0}
        </Typography>
      </Stack>
    </Box>
  </Card>
);
