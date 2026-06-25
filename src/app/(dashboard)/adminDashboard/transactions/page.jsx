"use client";

import React, { useState, useEffect } from 'react';
import { Table, Pagination } from '@heroui/react';
import { CreditCard, ShoppingBag, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { getPurchased } from '@/lib/action/getPurchased';
import { getSubscriptions } from '@/lib/action/getSubscriptions';

const ITEMS_PER_PAGE = 5;

const AdminTransactionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [purchasedData, setPurchasedData] = useState([]);
  const [loading, setLoading] = useState(true);

  // পেজিনেশন স্টেট
  const [subPage, setSubPage] = useState(1);
  const [purchasePage, setPurchasePage] = useState(1);

  // ডাটা ফেচিং
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subRes = await getSubscriptions('/api/subscriptions');
        const purRes = await getPurchased('/api/purchasedData');
        setSubscriptions(subRes || []);
        setPurchasedData(purRes || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-slate-500 font-medium">Loading transactions...</div>;
  }

  const hasSubscriptions = subscriptions.length > 0;
  const hasPurchased = purchasedData.length > 0;

  // দুটি এরেই যদি খালি থাকে তবে মেসেজ কার্ড দেখাবে
  if (!hasSubscriptions && !hasPurchased) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm space-y-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-slate-800 font-semibold text-lg">No Transactions Found</h3>
          <p className="text-slate-500 text-sm mt-1">There are currently no active subscriptions or purchase history available.</p>
        </div>
      </div>
    );
  }

  // পেজিনেশন ক্যালকুলেশন (Subscriptions)
  const totalSubPages = Math.ceil(subscriptions.length / ITEMS_PER_PAGE);
  const displayedSubs = subscriptions.slice(
    (subPage - 1) * ITEMS_PER_PAGE,
    subPage * ITEMS_PER_PAGE
  );

  // পেজিনেশন ক্যালকুলেশন (Purchased)
  const totalPurchasePages = Math.ceil(purchasedData.length / ITEMS_PER_PAGE);
  const displayedPurchases = purchasedData.slice(
    (purchasePage - 1) * ITEMS_PER_PAGE,
    purchasePage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12 bg-slate-50 min-h-screen">
      
      {/* ১. সাবস্ক্রিপশন টেবিল (যদি ডাটা থাকে) */}
      {hasSubscriptions && (
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg mb-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            <h2>Subscriptions ({subscriptions.length})</h2>
          </div>
          
          <Table>
            <Table.Content aria-label="Subscriptions">
              <Table.Header>
                <Table.Column isRowHeader>User</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Date</Table.Column>
                <Table.Column>Payment Status</Table.Column>
                <Table.Column>Transaction ID</Table.Column>
              </Table.Header>
              <Table.Body>
                {displayedSubs.map((sub, i) => (
                  <Table.Row key={sub.transactionId || i}>
                    <Table.Cell className="font-medium text-slate-700">{sub.customerEmail || '—'}</Table.Cell>
                    <Table.Cell className="font-semibold text-slate-900">
                      {sub.amount ? `${sub.amount} ${sub.currency || 'USD'}` : '—'}
                    </Table.Cell>
                    <Table.Cell className="text-slate-500 text-sm">{sub.paymentDate || '—'}</Table.Cell>
                    <Table.Cell>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                        <CheckCircle2 size={12} />
                        {sub.paymentStatus || '—'}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="font-mono text-xs text-slate-400">{sub.transactionId || '—'}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table>

          {/* সাবস্ক্রিপশন পেজিনেশন */}
          {totalSubPages > 1 && (
            <div className="pt-4 flex justify-center">
              <Pagination>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous isDisabled={subPage === 1} onPress={() => setSubPage((p) => p - 1)}>
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>
                  {Array.from({ length: totalSubPages }, (_, i) => i + 1).map((p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === subPage} onPress={() => setSubPage(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ))}
                  <Pagination.Item>
                    <Pagination.Next isDisabled={subPage === totalSubPages} onPress={() => setSubPage((p) => p + 1)}>
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {/* ২. পারচেজড ডাটা টেবিল (যদি ডাটা থাকে) */}
      {hasPurchased && (
        <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg mb-2">
            <ShoppingBag className="w-5 h-5 text-emerald-500" />
            <h2>Purchased Data ({purchasedData.length})</h2>
          </div>

          <Table>
            <Table.Content aria-label="Purchased Data">
              <Table.Header>
                <Table.Column isRowHeader>User</Table.Column>
                <Table.Column>Amount</Table.Column>
                <Table.Column>Date</Table.Column>
                <Table.Column>Payment Status</Table.Column>
                <Table.Column>Transaction ID</Table.Column>
              </Table.Header>
              <Table.Body>
                {displayedPurchases.map((item, i) => (
                  <Table.Row key={item.transactionId || i}>
                    <Table.Cell className="font-medium text-slate-700">{item.customerEmail || '—'}</Table.Cell>
                    <Table.Cell className="font-semibold text-slate-900">
                      {item.amount ? `${item.amount} ${item.currency || 'USD'}` : '—'}
                    </Table.Cell>
                    <Table.Cell className="text-slate-500 text-sm">{item.paymentDate || '—'}</Table.Cell>
                    <Table.Cell>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                        <CheckCircle2 size={12} />
                        {item.paymentStatus || '—'}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="font-mono text-xs text-slate-400">{item.transactionId || '—'}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table>

          {/* পারচেজ পেজিনেশন */}
          {totalPurchasePages > 1 && (
            <div className="pt-4 flex justify-center">
              <Pagination>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous isDisabled={purchasePage === 1} onPress={() => setPurchasePage((p) => p - 1)}>
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>
                  {Array.from({ length: totalPurchasePages }, (_, i) => i + 1).map((p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === purchasePage} onPress={() => setPurchasePage(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ))}
                  <Pagination.Item>
                    <Pagination.Next isDisabled={purchasePage === totalPurchasePages} onPress={() => setPurchasePage((p) => p + 1)}>
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default AdminTransactionsPage;