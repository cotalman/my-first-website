import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';

/**
 * NutritionBadge 컴포넌트 - 칼로리/당류/카테고리 뱃지
 *
 * Props:
 * @param {string} category - 카테고리 [Optional]
 * @param {number} calories - 칼로리 [Optional]
 * @param {number} sugar - 당류 [Optional]
 * @param {string} size - 'small' | 'medium' [Optional, 기본값: 'small']
 *
 * Example usage:
 * <NutritionBadge category="음료" calories={0} sugar={0} />
 */
function NutritionBadge({ category, calories, sugar, size = 'small' }) {
  const categoryColors = {
    음료: { bg: '#E0F7FA', color: '#00838F' },
    간식: { bg: '#FFF8E1', color: '#F57F17' },
    베이커리: { bg: '#FCE4EC', color: '#C62828' },
    단백질: { bg: '#E8F5E9', color: '#1B5E20' },
    기타: { bg: '#EDE7F6', color: '#4527A0' },
  };

  const catStyle = categoryColors[category] || categoryColors['기타'];

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {category && (
        <Chip
          label={category}
          size={size}
          sx={{
            backgroundColor: catStyle.bg,
            color: catStyle.color,
            fontWeight: 700,
            fontSize: '0.65rem',
          }}
        />
      )}
      {calories !== undefined && (
        <Chip
          icon={<LocalFireDepartmentRoundedIcon sx={{ fontSize: '0.85rem !important' }} />}
          label={`${calories}kcal`}
          size={size}
          sx={{
            backgroundColor: calories === 0 ? '#E8F5E9' : '#FFF3E0',
            color: calories === 0 ? '#2E7D32' : '#E65100',
            fontWeight: 700,
            fontSize: '0.65rem',
          }}
        />
      )}
      {sugar !== undefined && (
        <Chip
          label={`당류 ${sugar}g`}
          size={size}
          sx={{
            backgroundColor: sugar === 0 ? '#E3F2FD' : '#FFF8E1',
            color: sugar === 0 ? '#1565C0' : '#F57F17',
            fontWeight: 700,
            fontSize: '0.65rem',
          }}
        />
      )}
    </Box>
  );
}

export default NutritionBadge;
