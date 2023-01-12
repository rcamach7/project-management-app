import { useState, MouseEvent } from 'react';
import { signOut } from 'next-auth/react';
import { NextLinkAnchor } from '@/components/atoms/index';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material/';
import Image from 'next/image';

interface Props {
  image: string;
  name: string;
}

export default function ResponsiveAppBar({ image, name }: Props) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoImage = (
    <Image src="/hero/logo_icon.svg" alt="logo" width={30} height={25} />
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Image
              src="/hero/logo_icon.svg"
              alt="logo"
              width={25}
              height={25}
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            color="text.primary"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              pl: 1.5,
            }}
          >
            FLOW |
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={NextLinkAnchor} to="/">
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem component={NextLinkAnchor} to="/me">
                <Typography textAlign="center">My Account</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile */}
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
            }}
          >
            <Image
              src="/hero/logo_icon.svg"
              alt="logo"
              width={30}
              height={25}
            />
            <Typography
              variant="h5"
              color="text.primary"
              sx={{
                fontFamily: 'monospace',
                letterSpacing: '.3rem',
                pl: 1,
              }}
            >
              FLOW
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={NextLinkAnchor}
              sx={{ my: 2, color: 'text.primary', display: 'block' }}
              to="/"
            >
              Home
            </Button>
            <Button
              component={NextLinkAnchor}
              sx={{ my: 2, color: 'text.primary', display: 'block' }}
              to="/me"
            >
              My Account
            </Button>
          </Box>

          {/* Persistent User Icon */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={name} src={image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
