import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Button, Stack, Chip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { postService } from '../services/postService';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 2 },
  { field: 'author', headerName: 'Author', flex: 1 },
  { 
    field: 'status', 
    headerName: 'Status', 
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        color={
          params.value === 'published' ? 'success' : 
          params.value === 'draft' ? 'warning' : 'error'
        }
      />
    )
  },
  { field: 'created_at', headerName: 'Created At', type: 'date', flex: 1 },
];

export const PostsPage = () => {
  const [pagination, setPagination] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
  
  const { data, isLoading } = useQuery({
    queryKey: ['posts', pagination],
    queryFn: () => postService.getPosts({
      page: pagination.page + 1,
      pageSize: pagination.pageSize,
    }),
  });

  return (
    <div style={{ height: 600, width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <h1>Posts Management</h1>
        <Button variant="contained" startIcon={<Add />}>
          New Post
        </Button>
      </Stack>
      
      <DataGrid
        rows={data?.results || []}
        rowCount={data?.count || 0}
        columns={columns}
        loading={isLoading}
        paginationMode="server"
        paginationModel={pagination}
        onPaginationModelChange={setPagination}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
    </div>
  );
};