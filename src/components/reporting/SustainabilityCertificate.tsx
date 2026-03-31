import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5A27', // Eco-Green
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginTop: 40,
    marginBottom: 20,
  },
  certificateTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  organizationName: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#4B5563',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  statCard: {
    width: '30%',
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5A27',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 60,
    right: 60,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  badge: {
    width: 80,
    height: 80,
    backgroundColor: '#2D5A27',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

interface CertificateProps {
  organization: string;
  month: string;
  year: string;
  dollarsSaved: string;
  co2Avoided: string;
  landfillDiverted: string;
}

export const SustainabilityCertificate = ({ 
  organization, 
  month, 
  year, 
  dollarsSaved, 
  co2Avoided, 
  landfillDiverted 
}: CertificateProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>EcoLoop</Text>
          <Text style={styles.subtitle}>Circular OS for Sustainable Enterprises</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Verified</Text>
          <Text style={styles.badgeText}>Circularity</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.certificateTitle}>Sustainability Certificate</Text>
        <Text style={styles.organizationName}>Awarded to {organization}</Text>
        <Text style={{ textAlign: 'center', fontSize: 14, color: '#374151', marginBottom: 40 }}>
          For outstanding commitment to internal asset circularity and waste reduction during {month} {year}.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{dollarsSaved}</Text>
          <Text style={styles.statLabel}>Cost Avoided</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{co2Avoided}</Text>
          <Text style={styles.statLabel}>CO2 Offset</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{landfillDiverted}</Text>
          <Text style={styles.statLabel}>Waste Diverted</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.6 }}>
          This certificate verifies that {organization} successfully redistributed and repaired assets internally, 
          preventing the purchase of new equipment and significantly reducing the organization&apos;s environmental footprint.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Issued by EcoLoop Circular OS</Text>
        <Text style={styles.footerText}>Certificate ID: EL-{month.toUpperCase()}-{year}-{Math.floor(Math.random() * 10000)}</Text>
      </View>
    </Page>
  </Document>
);
