import React from 'react';
import { useSelector } from 'react-redux';

import { IAppState } from 'store/IAppState';

import TargetCard from './target-card';
import TargetContainer from './target-container';

export function BloodSugar() {
  const { bloodSugarTargets } = useSelector((state: IAppState) => ({
    bloodSugarTargets: state.home.bloodSugarTargets,
  }));
  return (
    <TargetContainer>
      {bloodSugarTargets.map((target, index) => (
        <TargetCard
          key={target.created_at}
          isLatest={index == 0}
          date={target.created_at}
          content={[
            {
              label: 'FPG (Fasting)',
              value: `${target.value_from}-${target.value_to} ${target.unit_name}`,
            },
            {
              label: 'PPG (Post-Meal)',
              value: `${target.ppg_value_from}-${target.ppg_value_to} ${target.unit_name}`,
            },
          ]}
        />
      ))}
    </TargetContainer>
  );
}

export function HbA1c() {
  const { hbA1cTargets } = useSelector((state: IAppState) => ({
    hbA1cTargets: state.home.hbA1cTargets,
  }));
  return (
    <TargetContainer>
      {hbA1cTargets.map((target, index) => (
        <TargetCard
          key={target.created_at}
          isLatest={index == 0}
          date={target.created_at}
          content={[
            {
              label: 'Goal Percentage',
              value: `${target.goal_value} ${target.unit_name}`,
            },
          ]}
        />
      ))}
    </TargetContainer>
  );
}
