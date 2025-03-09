import { FC } from 'react';

const Dashboard: FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tableau de bord</h2>
      <p className="text-gray-600">
        Bienvenue dans votre application de gestion d'équipe sportive.
      </p>
    </div>
  );
};

export default Dashboard;