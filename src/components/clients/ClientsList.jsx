import React from 'react'

const ClientsList = ({clients}) => {
  return (
      <table className="table table-striped">
          <thead>
              <tr>
                  <th>Client Name</th>
                  <th>Niche</th>
                  <th>Payment Rate</th>
              </tr>
          </thead>
          <tbody>
              {clients.map(client => (
                  <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.niche}</td>
                      <td>{client.paymentRate} $</td>
                  </tr>
              ))}
          </tbody>
      </table>
  )
}

export default ClientsList