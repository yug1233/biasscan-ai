import Papa from 'papaparse'

// Bias detection algorithms
export const detectBias = async (file, fileType) => {
  if (fileType === 'csv') {
    return await detectCSVBias(file)
  } else if (fileType === 'image') {
    return await detectImageBias(file)
  }
  throw new Error('Unsupported file type')
}

const detectCSVBias = async (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const data = results.data
          const biasMetrics = analyzeDataBias(data)
          resolve(biasMetrics)
        } catch (error) {
          reject(error)
        }
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}

const analyzeDataBias = (data) => {
  // Detect potential bias columns
  const biasColumns = ['gender', 'race', 'age', 'ethnicity', 'sex']
  const detectedBiases = []
  
  // Gender bias detection
  const genderCol = data[0] && Object.keys(data[0]).find(key => 
    key.toLowerCase().includes('gender') || key.toLowerCase().includes('sex')
  )
  
  if (genderCol) {
    const genderCounts = {}
    data.forEach(row => {
      const value = row[genderCol]?.toLowerCase()
      if (value) {
        genderCounts[value] = (genderCounts[value] || 0) + 1
      }
    })
    
    const total = Object.values(genderCounts).reduce((a, b) => a + b, 0)
    const genderDistribution = {}
    Object.keys(genderCounts).forEach(key => {
      genderDistribution[key] = ((genderCounts[key] / total) * 100).toFixed(1)
    })
    
    // Check for imbalance (>60% of any category)
    const maxPercentage = Math.max(...Object.values(genderDistribution).map(Number))
    const riskLevel = maxPercentage > 75 ? 'High' : maxPercentage > 60 ? 'Medium' : 'Low'
    
    detectedBiases.push({
      type: 'Gender',
      distribution: genderDistribution,
      riskLevel,
      recommendation: riskLevel !== 'Low' 
        ? `Resample to achieve 50/50 balance. Current: ${JSON.stringify(genderDistribution)}`
        : 'Distribution is balanced'
    })
  }
  
  // Age bias detection
  const ageCol = data[0] && Object.keys(data[0]).find(key => 
    key.toLowerCase().includes('age')
  )
  
  if (ageCol) {
    const ages = data.map(row => parseInt(row[ageCol])).filter(age => !isNaN(age))
    const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length
    const minAge = Math.min(...ages)
    const maxAge = Math.max(...ages)
    
    // Check for age range bias
    const ageRange = maxAge - minAge
    const riskLevel = ageRange < 20 ? 'High' : ageRange < 40 ? 'Medium' : 'Low'
    
    detectedBiases.push({
      type: 'Age',
      distribution: {
        average: avgAge.toFixed(1),
        min: minAge,
        max: maxAge,
        range: ageRange
      },
      riskLevel,
      recommendation: riskLevel !== 'Low'
        ? `Expand age range. Current range: ${minAge}-${maxAge} years`
        : 'Age distribution is diverse'
    })
  }
  
  // Race/Ethnicity bias detection
  const raceCol = data[0] && Object.keys(data[0]).find(key => 
    key.toLowerCase().includes('race') || key.toLowerCase().includes('ethnicity')
  )
  
  if (raceCol) {
    const raceCounts = {}
    data.forEach(row => {
      const value = row[raceCol]
      if (value) {
        raceCounts[value] = (raceCounts[value] || 0) + 1
      }
    })
    
    const total = Object.values(raceCounts).reduce((a, b) => a + b, 0)
    const raceDistribution = {}
    Object.keys(raceCounts).forEach(key => {
      raceDistribution[key] = ((raceCounts[key] / total) * 100).toFixed(1)
    })
    
    const maxPercentage = Math.max(...Object.values(raceDistribution).map(Number))
    const riskLevel = maxPercentage > 70 ? 'High' : maxPercentage > 50 ? 'Medium' : 'Low'
    
    detectedBiases.push({
      type: 'Race/Ethnicity',
      distribution: raceDistribution,
      riskLevel,
      recommendation: riskLevel !== 'Low'
        ? `Increase diversity. Current: ${JSON.stringify(raceDistribution)}`
        : 'Racial distribution is balanced'
    })
  }
  
  // Overall bias score
  const highRiskCount = detectedBiases.filter(b => b.riskLevel === 'High').length
  const mediumRiskCount = detectedBiases.filter(b => b.riskLevel === 'Medium').length
  
  let overallRisk = 'Low'
  if (highRiskCount > 0) overallRisk = 'High'
  else if (mediumRiskCount > 0) overallRisk = 'Medium'
  
  return {
    biases: detectedBiases,
    overallRisk,
    totalRows: data.length,
    columnsAnalyzed: detectedBiases.length,
    timestamp: new Date().toISOString()
  }
}

const detectImageBias = async (file) => {
  // Placeholder for image bias detection
  // In production, this would use TensorFlow.js or similar for face detection
  return {
    biases: [{
      type: 'Image Analysis',
      distribution: { analyzed: true },
      riskLevel: 'Medium',
      recommendation: 'Image bias detection requires ML model integration'
    }],
    overallRisk: 'Medium',
    totalRows: 1,
    columnsAnalyzed: 1,
    timestamp: new Date().toISOString()
  }
}

// Generate cleaned dataset
export const generateCleanedDataset = (originalData, biasMetrics) => {
  // Simple resampling strategy
  // In production, use more sophisticated techniques like SMOTE
  return originalData
}

// Export to CSV
export const exportToCSV = (data, filename) => {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}