import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { mean, variance } from 'mathjs';

const CsvRenderComponent = () => {
  const [data, setData] = useState([]);
  const [analysis, setAnalysis] = useState({ mean: {}, variance: {} });
  const [selectedStats, setSelectedStats] = useState({});
  const [csvFileName, setCsvFileName] = useState(''); // State to hold the selected CSV file name
  const fileInputRef = useRef(null); // Create a reference for the file input

  // Function to handle file selection and parsing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFileName(file.name.replace('.csv', '')); // Set the CSV file name without the .csv extension
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data);
          performAnalysis(result.data);
        },
        header: true,
      });
    }
  };

  const performAnalysis = (csvData) => {
    const numericColumns = Object.keys(csvData[0]).slice(1); // Ignore first column
    const columnMeans = {};
    const columnVariances = {};

    numericColumns.forEach((column) => {
      const values = csvData.map((row) => parseFloat(row[column])).filter((val) => !isNaN(val));
      columnMeans[column] = mean(values);
      columnVariances[column] = variance(values);
    });

    setAnalysis({ mean: columnMeans, variance: columnVariances });
  };

  // Function to update selected stats for a column
  const handleShowStats = (col, type) => {
    setSelectedStats((prev) => ({
      ...prev,
      [col]: { ...prev[col], [type]: analysis[type][col] },
    }));
  };

  // Function to clear data and analysis
  const handleClearContent = () => {
    setData([]);
    setAnalysis({ mean: {}, variance: {} });
    setSelectedStats({});
    setCsvFileName(''); // Clear the CSV file name
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
        CSV File Reader and Analysis
      </h2>

      {/* File Input Section */}
      <div style={styles.fileInputSection}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={styles.fileInput}
          ref={fileInputRef} // Attach the ref to the file input
        />
      </div>

      {data.length > 0 && (
        <>
          <div style={styles.analysisHeader}>
            <h1 style={styles.analysisTitle}>
              Analysis of {csvFileName} {/* Display the CSV file name here */}
            </h1>
            <button style={styles.clearButton} onClick={handleClearContent}>
              Clear Content
            </button>
          </div>

          <div style={styles.analysisSection}>
            <div style={styles.analysisGrid}>
              {Object.keys(analysis.mean).map((col, index) => (
                <div key={index} style={styles.analysisCard}>
                  <button style={styles.button} onClick={() => handleShowStats(col, 'mean')}>
                    Show Mean of {col}
                  </button>
                  <button style={styles.button} onClick={() => handleShowStats(col, 'variance')}>
                    Show Variance of {col}
                  </button>

                  {/* Conditionally render mean and variance */}
                  <div style={styles.statsContainer}>
                    {selectedStats[col] && selectedStats[col].mean !== undefined && (
                      <p style={styles.statsText}>Mean: {selectedStats[col].mean.toFixed(2)}</p>
                    )}
                    {selectedStats[col] && selectedStats[col].variance !== undefined && (
                      <p style={styles.statsText}>Variance: {selectedStats[col].variance.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSV Table Section */}
          <div style={styles.tableSection}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key, index) => (
                    <th key={index} style={styles.th}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} style={rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex} style={styles.td}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
  },
  fileInputSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  fileInput: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  analysisHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  analysisTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  clearButton: {
    padding: '10px 15px',
    backgroundColor: '#ea580c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  analysisSection: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  analysisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // Show 5 columns in each row
    gap: '20px',
    marginTop: '20px',
  },
  analysisCard: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10px',
  },
  button: {
    padding: '10px 15px',
    margin: '5px',
    backgroundColor: '#ea580c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  statsText: {
    marginTop: '5px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '1.2rem',
  },
  tableSection: {
    marginTop: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#ea580c',
    color: 'white',
    textAlign: 'center',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#f2f2f2',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
};

export default CsvRenderComponent;
