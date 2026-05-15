import { Leaf, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Colorful badge indicating Organic or Inorganic waste category.
 *
 * @param {Object} props
 * @param {string} props.category - 'Organik' or 'Anorganik'
 * @param {string} [props.className]
 */
export default function StatusBadge({ category, className }) {
  const isOrganic = category === 'Organik';

  return (
    <span
      className={cn(
        isOrganic ? 'badge-organic' : 'badge-inorganic',
        className
      )}
    >
      {isOrganic ? (
        <Leaf className="w-3 h-3" />
      ) : (
        <Trash2 className="w-3 h-3" />
      )}
      {isOrganic ? 'Organic' : 'Inorganic'}
    </span>
  );
}
