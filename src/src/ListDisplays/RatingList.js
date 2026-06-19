import React from 'react';

const RatingList = ({ matches }) => {

  return (
  <div>
      {matches.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(matches[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                {Object.values(match).map((value, subIndex) => (
                  <td key={subIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default RatingList;