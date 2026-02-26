import { Box, Container, Typography, Divider } from '@mui/material';

function SectionWrapper({ title, description, children }) {
  return (
    <Box className="section" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {description}
          </Typography>
        )}
        <Divider sx={{ mb: 4 }} />
        {children}
      </Container>
    </Box>
  );
}

export default SectionWrapper;
