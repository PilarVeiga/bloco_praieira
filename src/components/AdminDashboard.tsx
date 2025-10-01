'use client'

import { useState, useEffect } from 'react'

interface Member {
  id: string
  name: string
  role?: string
  instrument: string
  isActive: boolean
  joinedAt: string
}

interface Donation {
  id: string
  amount: number
  donorName?: string
  donorEmail?: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('members')
  const [members, setMembers] = useState<Member[]>([])
  const [donations, setDonations] = useState<Donation[]>([])
  const [totalDonations, setTotalDonations] = useState(0)
  const [loading, setLoading] = useState(true)

  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    instrument: 'MESTRES'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch members
      const membersRes = await fetch('/api/members')
      if (membersRes.ok) {
        const membersData = await membersRes.json()
        // Flatten grouped members
        const allMembers = Object.values(membersData).flat() as Member[]
        setMembers(allMembers)
      }

      // Fetch donations
      const donationsRes = await fetch('/api/donations')
      if (donationsRes.ok) {
        const donationsData = await donationsRes.json()
        setDonations(donationsData.donations)
        setTotalDonations(donationsData.totalAmount)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addMember = async () => {
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      })

      if (res.ok) {
        setNewMember({ name: '', role: '', instrument: 'MESTRES' })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const instrumentOptions = [
    'MESTRES',
    'HARMONIA',
    'CAIXA',
    'REPINIQUE',
    'SURDO',
    'XEQUERE_GANZA',
    'TAMBORIM'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-green mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold gradient-text">
            Admin - Bloco Praieira
          </h1>
          <p className="text-gray-400 mt-2">Painel administrativo</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'members'
                ? 'bg-neon-green text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Membros ({members.length})
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'donations'
                ? 'bg-neon-pink text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Doações (R$ {totalDonations.toFixed(2)})
          </button>
        </div>

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Add Member Form */}
            <div className="glassmorphism p-6">
              <h2 className="text-2xl font-semibold mb-4 text-neon-green">
                Adicionar Novo Membro
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Nome"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Função (opcional)"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
                <select
                  value={newMember.instrument}
                  onChange={(e) => setNewMember({ ...newMember, instrument: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  {instrumentOptions.map(instrument => (
                    <option key={instrument} value={instrument}>
                      {instrument.replace('_', ' & ')}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addMember}
                  disabled={!newMember.name}
                  className="bg-neon-green text-black font-semibold py-2 px-4 rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Members List */}
            <div className="glassmorphism p-6">
              <h2 className="text-2xl font-semibold mb-4 text-neon-green">
                Lista de Membros
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Nome</th>
                      <th className="text-left py-3 px-4">Função</th>
                      <th className="text-left py-3 px-4">Instrumento</th>
                      <th className="text-left py-3 px-4">Data de Entrada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b border-gray-800">
                        <td className="py-3 px-4 font-semibold">{member.name}</td>
                        <td className="py-3 px-4 text-gray-300">{member.role || '-'}</td>
                        <td className="py-3 px-4 text-neon-blue">
                          {member.instrument.replace('_', ' & ')}
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(member.joinedAt).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            {/* Donations Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glassmorphism p-6 text-center">
                <h3 className="text-lg font-semibold text-neon-pink mb-2">Total Arrecadado</h3>
                <p className="text-3xl font-bold text-white">R$ {totalDonations.toFixed(2)}</p>
              </div>
              <div className="glassmorphism p-6 text-center">
                <h3 className="text-lg font-semibold text-neon-blue mb-2">Total de Doações</h3>
                <p className="text-3xl font-bold text-white">{donations.length}</p>
              </div>
              <div className="glassmorphism p-6 text-center">
                <h3 className="text-lg font-semibold text-neon-green mb-2">Média por Doação</h3>
                <p className="text-3xl font-bold text-white">
                  R$ {donations.length ? (totalDonations / donations.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>

            {/* Donations List */}
            <div className="glassmorphism p-6">
              <h2 className="text-2xl font-semibold mb-4 text-neon-pink">
                Histórico de Doações
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Valor</th>
                      <th className="text-left py-3 px-4">Doador</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation.id} className="border-b border-gray-800">
                        <td className="py-3 px-4 font-semibold text-neon-green">
                          R$ {donation.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          {donation.donorName || 'Anônimo'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            donation.status === 'COMPLETED' 
                              ? 'bg-green-600 text-white'
                              : donation.status === 'PENDING'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-red-600 text-white'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(donation.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}