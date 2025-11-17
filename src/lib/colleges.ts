export interface College {
  aisheCode: string;
  name: string;
  state: string;
  district: string;
  yearOfEstablishment: string;
  location: string;
  standaloneType: string;
  management: string;
}

export function parseCollegesCSV(csvContent: string): College[] {
  const lines = csvContent.split('\n');
  const colleges: College[] = [];
  
  // Skip header lines and find the data start
  let dataStartIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Aishe Code,Name,State,District')) {
      dataStartIndex = i + 1;
      break;
    }
  }
  
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === 'ALL STANDALONE,,,,,,,' || line.includes('(As on Date:')) {
      continue;
    }
    
    // Parse CSV line handling quoted fields
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim());
    
    if (fields.length >= 8 && fields[0] && fields[1]) {
      colleges.push({
        aisheCode: fields[0],
        name: fields[1].replace(/"/g, '').trim(),
        state: fields[2],
        district: fields[3],
        yearOfEstablishment: fields[4],
        location: fields[5],
        standaloneType: fields[6],
        management: fields[7]
      });
    }
  }
  
  return colleges.sort((a, b) => a.name.localeCompare(b.name));
}

export function getCollegeNames(csvContent: string): string[] {
  const colleges = parseCollegesCSV(csvContent);
  return colleges.map(college => college.name);
}