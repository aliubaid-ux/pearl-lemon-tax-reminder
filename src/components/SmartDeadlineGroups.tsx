
import React from 'react';
import DeadlineGroupCard from '@/components/deadline-groups/DeadlineGroupCard';
import { useDeadlineGroups } from '@/components/deadline-groups/useDeadlineGroups';
import { TaxDeadline } from '@/types/tax';

interface SmartDeadlineGroupsProps {
  deadlines: TaxDeadline[];
}

const SmartDeadlineGroups: React.FC<SmartDeadlineGroupsProps> = ({ deadlines }) => {
  const { groups, openGroups, toggleGroup } = useDeadlineGroups(deadlines);

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <DeadlineGroupCard
          key={group.id}
          id={group.id}
          title={group.title}
          icon={group.icon}
          color={group.color}
          deadlines={group.deadlines}
          isOpen={openGroups.has(group.id)}
          onToggle={() => toggleGroup(group.id)}
          isCategory={group.isCategory}
        />
      ))}
    </div>
  );
};

export default SmartDeadlineGroups;
