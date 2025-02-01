import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArticleOutlined,
  CommentOutlined,
  PeopleOutlined,
  SettingsOutlined,
  DashboardOutlined,
} from '@mui/icons-material';
import { themeMixins } from './styles';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardOutlined />, path: '/' },
  { text: 'Posts', icon: <ArticleOutlined />, path: '/posts' },
  { text: 'Comments', icon: <CommentOutlined />, path: '/comments' },
  { text: 'Users', icon: <PeopleOutlined />, path: '/users' },
  { text: 'Settings', icon: <SettingsOutlined />, path: '/settings' },
];

interface SidebarProps {
  open: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export const Sidebar = ({ open, isMobile, onClose }: SidebarProps) => (
  <Drawer
    variant={isMobile ? 'temporary' : 'persistent'}
    open={open}
    onClose={onClose}
    ModalProps={{ keepMounted: true }}
    sx={{
      width: themeMixins.drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: themeMixins.drawerWidth,
        boxSizing: 'border-box',
      },
    }}
  >
    <Toolbar />
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
);