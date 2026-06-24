'use client'

import { Table, Button, Chip } from '@heroui/react';
import React from 'react';

const AdminReports = ({ reports = [] }) => {
  return (
    <div className=" max-w-7xl mx-auto">
   

      {/* Fixed Structure for Next.js Client Components */}
      <Table 
        aria-label="Admin Reports Table"
        shadow="sm"
        radius="lg"
      >
        <Table.ScrollContainer>
          <Table.Content aria-label="Report list content" className="min-w-[600px]">
            <Table.Header>
              <Table.Column isRowHeader>Recipe Name</Table.Column>
              <Table.Column>Reporter</Table.Column>
              <Table.Column>Reason</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-center">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {/* কোনো কালেকশন বা ফাংশন এরর ছাড়া ডাইনামিক ডেটা রেন্ডার করার সবচেয়ে নিরাপদ পদ্ধতি */}
              {reports.map((report) => (
                <Table.Row 
                  key={report._id || Math.random().toString()} 
                  className="border-b border-gray-100 dark:border-gray-800 last:border-none hover:bg-gray-50/50 transition-colors"
                >
                  {/* Recipe Title */}
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {report.recipeName || "Spicy Beef Rezala"}
                  </Table.Cell>
                  
                  {/* Reporter Details */}
                  <Table.Cell>
                    <div>
                      <p className="font-medium">{report.reporterName || "Kamrul Hasan"}</p>
                      <p className="text-xs text-gray-400">{report.reporterEmail || "kamrul@example.com"}</p>
                    </div>
                  </Table.Cell>
                  
                  {/* Reason for Report */}
                  <Table.Cell className="max-w-[200px] truncate">
                    {report.reason || "Misleading recipe and copyright violation."}
                  </Table.Cell>
                  
                  {/* Status Chip */}
                  <Table.Cell>
                    <Chip size="sm" variant="flat" color="warning">
                      Pending
                    </Chip>
                  </Table.Cell>
                  
                  {/* Action Buttons */}
                  <Table.Cell>
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        size="sm" 
                        color="danger" 
                        variant="flat"
                        className="font-medium"
                        onPress={() => console.log('Remove Recipe', report._id)}
                      >
                        Remove Recipe
                      </Button>
                      <Button 
                        size="sm" 
                        color="default" 
                        variant="light"
                        className="font-medium text-gray-500 hover:text-gray-700"
                        onPress={() => console.log('Dismiss Report', report._id)}
                      >
                        Dismiss Report
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default AdminReports;