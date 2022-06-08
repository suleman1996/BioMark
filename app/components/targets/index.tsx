import React from 'react';
import { useSelector } from 'react-redux';

import { IAppState } from 'store/IAppState';

import TargetCard from './target-card';
import TargetContainer from './target-container';

export function BloodSugar() {
  const { bloodSugarTargets, latestBloodSugar } = useSelector(
    (state: IAppState) => ({
      latestBloodSugar: state.home.latestBloodSugar,
      bloodSugarTargets: state.home.bloodSugarTargets,
    })
  );
  return (
    <TargetContainer>
      {latestBloodSugar && (
        <TargetCard
          isLatest
          date={latestBloodSugar.record_date_day}
          content={[
            {
              label: 'FPG (Fasting)',
              value: `${latestBloodSugar.value_from}-${latestBloodSugar.value_to} ${latestBloodSugar.unit_name}`,
            },
            {
              label: 'PPG (Fasting)',
              value: `${latestBloodSugar.ppg_value_from}-${latestBloodSugar.ppg_value_to} ${latestBloodSugar.unit_name}`,
            },
          ]}
        />
      )}
      {bloodSugarTargets.map((target) => (
        <TargetCard
          date={target.created_at}
          content={[
            {
              label: 'FPG (Fasting)',
              value: `${target.value_from}-${target.value_to} ${target.unit_name}`,
            },
            {
              label: 'PPG (Fasting)',
              value: `${target.ppg_value_from}-${target.ppg_value_to} ${target.unit_name}`,
            },
          ]}
        />
      ))}
    </TargetContainer>
  );
}

export function HbA1c() {
  const { latestHba1c, hbA1cTargets } = useSelector((state: IAppState) => ({
    latestHba1c: state.home.latestHba1c,
    hbA1cTargets: state.home.hbA1cTargets,
  }));
  return (
    <TargetContainer>
      {latestHba1c && (
        <TargetCard
          isLatest
          date={latestHba1c.record_date_day}
          content={[
            {
              label: 'Goal Percentage',
              value: `${latestHba1c.goal_value} ${latestHba1c.unit_name}`,
            },
          ]}
        />
      )}
      {hbA1cTargets.map((target) => (
        <TargetCard
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
