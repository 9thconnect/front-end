"use client";

import AnalyticCard from "@/components/cards/common/analyticCard";
import RevenueChart from "@/components/charts/revenueChart";
import { DatePickerWithRange } from "@/components/common/datePickerRange";
import { SalesData } from "@/components/tables/recent-sales/columns";
import SalesDataTable from "@/components/tables/recent-sales/data-table";
import VendorDataTable from "@/components/tables/vendors/data-table";
import { Button } from "@/components/ui/button";
import { AdminStats } from "@/type/users";
import requests from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
import {
  HandCoins,
  TriangleAlert,
  UsersRound,
  Wallet,
  ShoppingCart,
  Package,
  TagIcon,
  Briefcase,
  Building,
  Wrench,
  Home,
  Truck,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminProductTable from "@/components/tables/admin/products/data-table";
import OrderTableAdmin from "@/components/tables/admin/orders/data-table";

const Page = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () =>
      requests.get<{
        data: AdminStats;
      }>("/admin/dashboard-summary"),
  });

  const stats = data?.data?.data || {
    walletStats: {
      totalAmountOwedToSellers: 0,
      totalAmountReceivedBySellers: 0,
      totalAmountOwedToProfessionals: 0,
      totalAmountReceivedByProfessionals: 0,
      totalAmountWithdrawByVendors: 0,
    },
    orderStats: {
      pendingOrders: 0,
      receivedOrders: 0,
      processingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      totalOrderedAmount: 0,
    },
    productStats: {
      totalProducts: 0,
      totalProductValue: 0,
    },
    offerStats: {
      pendingOffers: 0,
      acceptedOffers: 0,
      rejectedOffers: 0,
      totalProposedPrice: 0,
    },
    projectStats: {
      startedProjects: 0,
      completedProjects: 0,
      cancelledProjects: 0,
      totalApprovedPrice: 0,
    },
    professionStats: {
      totalProfessions: 0,
      professionTotalValue: 0,
    },
    artisanStats: {
      totalArtisans: 0,
    },
    propertyStats: {
      totalProperties: 0,
    },
    logisticStats: {
      totalFleets: 0,
    },
    transactionStats: {
      pendingPayments: 0,
      approvedPayments: 0,
      failedPayments: 0,
      totalPayments: 0,
    },
  };

  // Utility function to format numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate total users (artisans + professionals)
  const totalUsers =
    stats.artisanStats.totalArtisans + stats.professionStats.totalProfessions;

  // Calculate total revenue (from orders and projects)
  const totalRevenue =
    stats.orderStats.totalOrderedAmount + stats.projectStats.totalApprovedPrice;

  // Calculate pending payments
  const pendingPayments = stats.transactionStats.pendingPayments;

  // Calculate total transactions
  const totalTransactions = stats.transactionStats.totalPayments;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg border border-red-200">
          <div className="flex items-center space-x-3">
            <TriangleAlert className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Error Loading Dashboard
            </h2>
          </div>
          <p className="mt-4 text-gray-600">
            Failed to load dashboard data. Please try refreshing the page.
          </p>
          <Button
            className="mt-6 w-full"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            View and manage your platform metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <DatePickerWithRange />
          <Button className="font-medium">
            <span className="mr-2">Download Report</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticCard
          title={totalUsers.toString()}
          subTitle="TOTAL USERS"
          Icon={UsersRound}
          colorClass="bg-blue-50 text-blue-600"
        />
        <AnalyticCard
          title={formatCurrency(totalRevenue)}
          subTitle="TOTAL REVENUE"
          Icon={HandCoins}
          colorClass="bg-green-50 text-green-600"
        />
        <AnalyticCard
          title={formatCurrency(pendingPayments)}
          subTitle="PENDING PAYMENTS"
          Icon={Clock}
          colorClass="bg-amber-50 text-amber-600"
        />
        <AnalyticCard
          title={totalTransactions.toString()}
          subTitle="TOTAL TRANSACTIONS"
          Icon={CreditCard}
          colorClass="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Tabbed Interface */}
      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Key Metrics Summary</CardTitle>
                <CardDescription>Overall platform performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5 p-4 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">
                      Total Products
                    </span>
                    <span className="text-2xl font-bold">
                      {stats.productStats.totalProducts}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1.5 p-4 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">
                      Total Orders
                    </span>
                    <span className="text-2xl font-bold">
                      {stats.orderStats.pendingOrders +
                        stats.orderStats.receivedOrders +
                        stats.orderStats.processingOrders +
                        stats.orderStats.shippedOrders +
                        stats.orderStats.deliveredOrders}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1.5 p-4 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">
                      Active Projects
                    </span>
                    <span className="text-2xl font-bold">
                      {stats.projectStats.startedProjects}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1.5 p-4 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">
                      Properties
                    </span>
                    <span className="text-2xl font-bold">
                      {stats.propertyStats.totalProperties}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1.5 p-4 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">
                      Logistics Fleets
                    </span>
                    <span className="text-2xl font-bold">
                      {stats.logisticStats.totalFleets}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1.5 p-4 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-500">
                      Pending Offers
                    </span>
                    <span className="text-2xl font-bold">
                      {stats.offerStats.pendingOffers}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Suspense
            fallback={
              <div className="w-full h-96 flex items-center justify-center">
                Loading vendor data...
              </div>
            }
          >
            <VendorDataTable />
          </Suspense>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Orders Overview</CardTitle>
                  <ShoppingCart className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-medium">
                      {formatCurrency(stats.orderStats.totalOrderedAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-medium">
                      {stats.orderStats.pendingOrders +
                        stats.orderStats.receivedOrders +
                        stats.orderStats.processingOrders +
                        stats.orderStats.shippedOrders +
                        stats.orderStats.deliveredOrders +
                        stats.orderStats.cancelledOrders}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivered Orders</span>
                    <span className="font-medium">
                      {stats.orderStats.deliveredOrders}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cancelled Orders</span>
                    <span className="font-medium">
                      {stats.orderStats.cancelledOrders}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order Status</CardTitle>
                  <Package className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                      <span className="text-gray-600">Pending</span>
                    </div>
                    <span className="font-medium">
                      {stats.orderStats.pendingOrders}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                      <span className="text-gray-600">Received</span>
                    </div>
                    <span className="font-medium">
                      {stats.orderStats.receivedOrders}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                      <span className="text-gray-600">Processing</span>
                    </div>
                    <span className="font-medium">
                      {stats.orderStats.processingOrders}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 mr-2"></div>
                      <span className="text-gray-600">Shipped</span>
                    </div>
                    <span className="font-medium">
                      {stats.orderStats.shippedOrders}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Offers Status</CardTitle>
                  <TagIcon className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-medium">
                      {formatCurrency(stats.offerStats.totalProposedPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                      <span className="text-gray-600">Pending</span>
                    </div>
                    <span className="font-medium">
                      {stats.offerStats.pendingOffers}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-gray-600">Accepted</span>
                    </div>
                    <span className="font-medium">
                      {stats.offerStats.acceptedOffers}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <span className="text-gray-600">Rejected</span>
                    </div>
                    <span className="font-medium">
                      {stats.offerStats.rejectedOffers}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Suspense
            fallback={
              <div className="w-full h-96 flex items-center justify-center">
                Loading order data...
              </div>
            }
          >
            <OrderTableAdmin />
          </Suspense>
        </TabsContent>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Wallet Statistics</CardTitle>
                  <Wallet className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Owed to Sellers</span>
                    <span className="font-medium">
                      {formatCurrency(
                        stats.walletStats.totalAmountOwedToSellers
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Received by Sellers</span>
                    <span className="font-medium">
                      {formatCurrency(
                        stats.walletStats.totalAmountReceivedBySellers
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Owed to Professionals</span>
                    <span className="font-medium">
                      {formatCurrency(
                        stats.walletStats.totalAmountOwedToProfessionals
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Received by Professionals
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        stats.walletStats.totalAmountReceivedByProfessionals
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Withdrawn by Vendors</span>
                    <span className="font-medium">
                      {formatCurrency(
                        stats.walletStats.totalAmountWithdrawByVendors
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Transaction Statistics
                  </CardTitle>
                  <CreditCard className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Transactions</span>
                    <span className="font-medium">
                      {stats.transactionStats.totalPayments}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                      <span className="text-gray-600">Pending</span>
                    </div>
                    <span className="font-medium">
                      {stats.transactionStats.pendingPayments}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-gray-600">Approved</span>
                    </div>
                    <span className="font-medium">
                      {stats.transactionStats.approvedPayments}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <span className="text-gray-600">Failed</span>
                    </div>
                    <span className="font-medium">
                      {stats.transactionStats.failedPayments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Project Financials</CardTitle>
                  <Briefcase className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Approved Price</span>
                    <span className="font-medium">
                      {formatCurrency(stats.projectStats.totalApprovedPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Started Projects</span>
                    <span className="font-medium">
                      {stats.projectStats.startedProjects}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Projects</span>
                    <span className="font-medium">
                      {stats.projectStats.completedProjects}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cancelled Projects</span>
                    <span className="font-medium">
                      {stats.projectStats.cancelledProjects}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Complete financial summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Revenue Sources
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Orders Revenue</span>
                      <span className="font-medium">
                        {formatCurrency(stats.orderStats.totalOrderedAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projects Revenue</span>
                      <span className="font-medium">
                        {formatCurrency(stats.projectStats.totalApprovedPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Product Value</span>
                      <span className="font-medium">
                        {formatCurrency(stats.productStats.totalProductValue)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Total Profession Value
                      </span>
                      <span className="font-medium">
                        {formatCurrency(
                          stats.professionStats.professionTotalValue
                        )}
                      </span>
                    </div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-semibold">
                        Total Revenue
                      </span>
                      <span className="font-bold">
                        {formatCurrency(totalRevenue)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Pending Payments
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Pending Transactions
                      </span>
                      <span className="font-medium">
                        {stats.transactionStats.pendingPayments}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Owed to Sellers</span>
                      <span className="font-medium">
                        {formatCurrency(
                          stats.walletStats.totalAmountOwedToSellers
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Owed to Professionals
                      </span>
                      <span className="font-medium">
                        {formatCurrency(
                          stats.walletStats.totalAmountOwedToProfessionals
                        )}
                      </span>
                    </div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-semibold">
                        Total Pending
                      </span>
                      <span className="font-bold">
                        {formatCurrency(
                          stats.walletStats.totalAmountOwedToSellers +
                            stats.walletStats.totalAmountOwedToProfessionals
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Product Statistics</CardTitle>
                  <Package className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="py-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold block">
                      {stats.productStats.totalProducts}
                    </span>
                    <span className="text-gray-500 mt-1 block">
                      Total Products
                    </span>
                  </div>
                  <div className="mt-8 text-center">
                    <span className="text-2xl font-bold block">
                      {formatCurrency(stats.productStats.totalProductValue)}
                    </span>
                    <span className="text-gray-500 mt-1 block">
                      Total Product Value
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Profession Statistics
                  </CardTitle>
                  <Building className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="py-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold block">
                      {stats.professionStats.totalProfessions}
                    </span>
                    <span className="text-gray-500 mt-1 block">
                      Total Professions
                    </span>
                  </div>
                  <div className="mt-8 text-center">
                    <span className="text-2xl font-bold block">
                      {formatCurrency(
                        stats.professionStats.professionTotalValue
                      )}
                    </span>
                    <span className="text-gray-500 mt-1 block">
                      Total Profession Value
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Property Statistics</CardTitle>
                  <Home className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="py-6">
                  <div className="text-center">
                    <span className="text-4xl font-bold block">
                      {stats.propertyStats.totalProperties}
                    </span>
                    <span className="text-gray-500 mt-1 block">
                      Total Properties
                    </span>
                  </div>
                  <div className="mt-8 text-center">
                    <span className="text-2xl font-bold block">
                      {stats.logisticStats.totalFleets}
                    </span>
                    <span className="text-gray-500 mt-1 block">
                      Total Logistics Fleets
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Categories Overview</CardTitle>
              <CardDescription>
                Distribution of products and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Package className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Regular Products</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {Math.round(stats.productStats.totalProducts * 0.7)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    70% of total inventory
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Briefcase className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Professional Services</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {stats.professionStats.totalProfessions}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Available service categories
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Wrench className="h-5 w-5 text-amber-500" />
                    <span className="font-medium">Artisan Services</span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    {stats.artisanStats.totalArtisans}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Registered artisans
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Value Distribution</h3>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Products
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {formatCurrency(stats.productStats.totalProductValue)}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: "60%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        Professional Services
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {formatCurrency(
                          stats.professionStats.professionTotalValue
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div
                      style={{ width: "40%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Artisans</CardTitle>
                  <Wrench className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <span className="text-4xl font-bold block">
                    {stats.artisanStats.totalArtisans}
                  </span>
                  <span className="text-gray-500 mt-2 block">
                    Total Registered Artisans
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Professionals</CardTitle>
                  <Building className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <span className="text-4xl font-bold block">
                    {stats.professionStats.totalProfessions}
                  </span>
                  <span className="text-gray-500 mt-2 block">
                    Total Professional Services
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Logistics</CardTitle>
                  <Truck className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <span className="text-4xl font-bold block">
                    {stats.logisticStats.totalFleets}
                  </span>
                  <span className="text-gray-500 mt-2 block">
                    Total Logistics Fleets
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Properties</CardTitle>
                  <Home className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <span className="text-4xl font-bold block">
                    {stats.propertyStats.totalProperties}
                  </span>
                  <span className="text-gray-500 mt-2 block">
                    Total Listed Properties
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                  Recent user engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      ARTISAN ENGAGEMENT
                    </h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Active Projects</span>
                        <span className="font-medium">
                          {stats.projectStats.startedProjects}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">
                          Completed Projects
                        </span>
                        <span className="font-medium">
                          {stats.projectStats.completedProjects}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          Project Success Rate
                        </span>
                        <span className="font-medium">
                          {stats.projectStats.completedProjects > 0
                            ? Math.round(
                                (stats.projectStats.completedProjects /
                                  (stats.projectStats.completedProjects +
                                    stats.projectStats.cancelledProjects)) *
                                  100
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      SELLER ENGAGEMENT
                    </h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Active Products</span>
                        <span className="font-medium">
                          {stats.productStats.totalProducts}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Delivered Orders</span>
                        <span className="font-medium">
                          {stats.orderStats.deliveredOrders}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          Order Success Rate
                        </span>
                        <span className="font-medium">
                          {stats.orderStats.deliveredOrders +
                            stats.orderStats.cancelledOrders >
                          0
                            ? Math.round(
                                (stats.orderStats.deliveredOrders /
                                  (stats.orderStats.deliveredOrders +
                                    stats.orderStats.cancelledOrders)) *
                                  100
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Breakdown of user types across platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-8 border-gray-200 flex items-center justify-center relative">
                      <div className="absolute w-full h-full">
                        <div
                          className="absolute top-0 left-0 w-1/2 h-1/2 rounded-tl-full border-r-8 border-b-8 border-purple-500"
                          style={{ transform: "rotate(0deg)" }}
                        ></div>
                        <div
                          className="absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full border-l-8 border-b-8 border-blue-500"
                          style={{ transform: "rotate(0deg)" }}
                        ></div>
                        <div
                          className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-br-full border-l-8 border-t-8 border-amber-500"
                          style={{ transform: "rotate(0deg)" }}
                        ></div>
                        <div
                          className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-bl-full border-r-8 border-t-8 border-green-500"
                          style={{ transform: "rotate(0deg)" }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <div className="text-sm text-gray-500">Total Users</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute right-4 top-4 space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">
                        Artisans: {stats.artisanStats.totalArtisans}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">
                        Professionals: {stats.professionStats.totalProfessions}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-sm">
                        Logistics: {stats.logisticStats.totalFleets}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">
                        Properties: {stats.propertyStats.totalProperties}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
