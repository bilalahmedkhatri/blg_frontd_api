import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import { RichTextEditor } from 'mui-tiptap';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Container,
  useTheme,
  useMediaQuery,
  OutlinedInput,
  styled
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import type { Editor } from '@tiptap/core';
// import api from '../services/api';

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

const EditorContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '& .ProseMirror': {
    padding: theme.spacing(2),
    minHeight: 300,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200
    }
  }
}));

function PostCreate2() {
  const [title, setTitle] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [featuredImageText, setFeaturedImageText] = useState<string>('Upload Featured Image')

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  const getFeaturedImageName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.files || null;
    const fileName = text[0].name.length > 10 ? text[0].name.substring(0, 10) : text[0].name;
    setFeaturedImageText(`Selected: ${fileName}...`);
  };

  const debounce = (func: (content: string) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (content: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(content), wait);
    };
  };

  const saveContent = useCallback(
    debounce((content: string) => {
      localStorage.setItem('editorContent', content);
    }, 1000),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesResponse, tagsResponse] = await Promise.all([
          api.getcategory(),
          api.getTags()
        ]);

        setCategories(categoriesResponse.data || []);
        setTags(tagsResponse.data || []);

        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
          setContent(savedContent);
        }
      } catch (err) {
        setError('Failed to load categories and tags');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    selectedCategories.forEach((catId) => {
      formData.append('categories', catId);
    });
    selectedTags.forEach((tagId) => {
      formData.append('tags', tagId);
    });
    if (featuredImage) {
      formData.append('featured_image', featuredImage);
    }
    formData.append('keywords', keywords);

    try {
      const response = await api.createPost(formData);
      if (response.data) {
        localStorage.removeItem('editorContent');
        // navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error details:', error);
      setError(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageCallBack = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.uploadImage(formData);
      if (response.data?.url) {
        return response.data.url;
      }
      throw new Error('Failed to upload image');
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return (
    <Grid spacing={3}
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        padding: 10,
      }}
    >
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <Typography variant="h4" gutterBottom>
          Create Post
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Post Title */}
            <Grid size={{ xs: 12, md: 9, lg: 9 }}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            {/* Feature image upload */}
            <Grid size={{ xs: 12, md: 3 }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={getFeaturedImageName}
              // onChange={(e) => setFeaturedImage("", e.target.files?.[0] || null)}
              />
              <Button
                variant="outlined"
                onClick={() => fileInputRef.current?.click()}
                sx={{ borderRadius: 2 }}
              >
                {/* Upload Featured Image */}
                {featuredImageText}
              </Button>
              {featuredImage && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {featuredImage.name}
                </Typography>
              )}
            </Grid>
            {/* Rich text editor */}
            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <EditorContainer>
                <RichTextEditor
                  content={content}
                  onUpdate={({ editor }) => {
                    const html = editor.getHTML();
                    setContent(html);
                    saveContent(html);
                  }}
                  extensions={[
                    StarterKit,
                    Image.configure({
                      inline: true,
                      allowBase64: false,
                    })
                  ]}
                  editorProps={{
                    handleDrop: (view, event) => {
                      const files = event.dataTransfer?.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        if (file.type.startsWith('image/')) {
                          uploadImageCallBack(file).then((url) => {
                            const { schema } = view.state;
                            const coordinates = view.posAtCoords({
                              left: event.clientX,
                              top: event.clientY
                            });
                            if (coordinates) {
                              const node = schema.nodes.image.create({
                                src: url
                              });
                              const transaction = view.state.tr.insert(
                                coordinates.pos,
                                node
                              );
                              view.dispatch(transaction);
                            }
                          });
                          return true;
                        }
                      }
                      return false;
                    }
                  }}
                />
              </EditorContainer>
            </Grid>
            {/* Category Selection */}
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="categories-label">Categories</InputLabel>
                <Select
                  labelId="categories-label"
                  multiple
                  value={selectedCategories}
                  onChange={(e) => setSelectedCategories(e.target.value as string[])}
                  input={<OutlinedInput label="Categories" sx={{ borderRadius: 2 }} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const category = categories.find(c => c.id === value);
                        return (
                          <Chip
                            key={value}
                            label={category?.name || value}
                            sx={{
                              backgroundColor: getRandomLightColor(),
                              borderRadius: 2
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Tag Selection */}
            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="tags-label">Tags</InputLabel>
                <Select
                  labelId="tags-label"
                  multiple
                  value={selectedTags}
                  onChange={(e) => setSelectedTags(e.target.value as string[])}
                  input={<OutlinedInput label="Tags" sx={{ borderRadius: 2 }} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const tag = tags.find(t => t.id === value);
                        return (
                          <Chip
                            key={value}
                            label={tag?.name || value}
                            sx={{
                              backgroundColor: getRandomLightColor(),
                              borderRadius: 2
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Keywords */}
            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <TextField
                fullWidth
                label="Keywords (comma-separated)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            {/* Submit Button */}
            <Grid size={{ xs: 12, md: 12, lg: 12 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Create Post
              </Button>
            </Grid>

            {isLoading && (
              <Grid size={{ xs: 12, md: 10, lg: 12 }}>
                <CircularProgress />
              </Grid>
            )}

            {error && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
              </Grid>
            )}
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default PostCreate2;