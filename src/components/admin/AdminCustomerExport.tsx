import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  FileText, 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Filter,
  FileSpreadsheet,
  BarChart3,
  PieChart,
  FileDown,
  DateRange
} from "lucide-react";

const AdminCustomerExport = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isArabic = language === 'ar';
  const [isExporting, setIsExporting] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reportType, setReportType] = useState("all");

  // بيانات تجريبية موسعة
  const customersData = [
    {
      id: "1",
      name: "أحمد محمد علي",
      email: "ahmed@example.com",
      phone: "+966501234567",
      joinDate: "2024-01-15",
      totalBookings: 5,
      totalSpent: 3200,
      status: "active",
      lastLogin: "2024-01-20",
      monthlySpending: [500, 800, 650, 400, 850]
    },
    {
      id: "2", 
      name: "فاطمة سالم",
      email: "fatima@example.com",
      phone: "+966507654321",
      joinDate: "2023-11-20",
      totalBookings: 8,
      totalSpent: 5600,
      status: "active",
      lastLogin: "2024-01-19",
      monthlySpending: [700, 1200, 900, 1100, 1700]
    }
  ];

  const financialData = {
    totalRevenue: 125600,
    monthlyRevenue: [8500, 12300, 9800, 11200, 14600, 13400],
    revenueBySource: {
      packages: 75600,
      flights: 32000,
      hotels: 18000
    },
    expenses: {
      marketing: 15000,
      operations: 25000,
      salaries: 35000
    },
    profit: 50600
  };

  const performanceData = {
    bookingConversion: 12.5,
    customerRetention: 68.3,
    averageBookingValue: 2840,
    customerSatisfaction: 4.7,
    monthlyGrowth: [5.2, 8.1, 12.3, 15.6, 18.9, 22.1]
  };

  // تصدير CSV
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  // تصدير Excel (تنسيق CSV محسن)
  const exportToExcel = (data: any[], filename: string) => {
    // محاكاة تصدير Excel بصيغة CSV محسنة
    const headers = Object.keys(data[0]).join('\t');
    const rows = data.map(row => Object.values(row).join('\t')).join('\n');
    const excelContent = `${headers}\n${rows}`;
    
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.xlsx`;
    link.click();
  };

  const generateFinancialReport = () => {
    setIsExporting(true);
    
    const reportContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>التقرير المالي - URTRVL</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              direction: rtl;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 10px;
            }
            .financial-summary {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
              margin: 30px 0;
            }
            .metric-card {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              border: 1px solid #e2e8f0;
            }
            .metric-value {
              font-size: 28px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 5px;
            }
            .metric-label {
              color: #666;
              font-size: 14px;
            }
            .chart-section {
              margin: 30px 0;
              padding: 20px;
              background: #f8fafc;
              border-radius: 8px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: right;
            }
            th {
              background-color: #f8fafc;
              font-weight: bold;
              color: #1e40af;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">URTRVL - التقرير المالي</div>
            <div>الفترة: من ${dateFrom || '2024-01-01'} إلى ${dateTo || new Date().toISOString().split('T')[0]}</div>
          </div>
          
          <div class="financial-summary">
            <div class="metric-card">
              <div class="metric-value">€${financialData.totalRevenue.toLocaleString()}</div>
              <div class="metric-label">إجمالي الإيرادات</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">€${financialData.profit.toLocaleString()}</div>
              <div class="metric-label">صافي الربح</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${performanceData.bookingConversion}%</div>
              <div class="metric-label">معدل التحويل</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">€${performanceData.averageBookingValue.toLocaleString()}</div>
              <div class="metric-label">متوسط قيمة الحجز</div>
            </div>
          </div>

          <div class="chart-section">
            <h3>توزيع الإيرادات حسب المصدر</h3>
            <table>
              <tr>
                <th>المصدر</th>
                <th>المبلغ</th>
                <th>النسبة</th>
              </tr>
              <tr>
                <td>الباقات السياحية</td>
                <td>€${financialData.revenueBySource.packages.toLocaleString()}</td>
                <td>${Math.round((financialData.revenueBySource.packages / financialData.totalRevenue) * 100)}%</td>
              </tr>
              <tr>
                <td>حجز الطيران</td>
                <td>€${financialData.revenueBySource.flights.toLocaleString()}</td>
                <td>${Math.round((financialData.revenueBySource.flights / financialData.totalRevenue) * 100)}%</td>
              </tr>
              <tr>
                <td>حجز الفنادق</td>
                <td>€${financialData.revenueBySource.hotels.toLocaleString()}</td>
                <td>${Math.round((financialData.revenueBySource.hotels / financialData.totalRevenue) * 100)}%</td>
              </tr>
            </table>
          </div>

          <div class="chart-section">
            <h3>المصروفات</h3>
            <table>
              <tr>
                <th>نوع المصروف</th>
                <th>المبلغ</th>
              </tr>
              <tr>
                <td>التسويق والإعلان</td>
                <td>€${financialData.expenses.marketing.toLocaleString()}</td>
              </tr>
              <tr>
                <td>التشغيل والصيانة</td>
                <td>€${financialData.expenses.operations.toLocaleString()}</td>
              </tr>
              <tr>
                <td>الرواتب والأجور</td>
                <td>€${financialData.expenses.salaries.toLocaleString()}</td>
              </tr>
            </table>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsExporting(false);
          toast({
            title: isArabic ? "تم تصدير التقرير المالي" : "Financial Report Exported",
            description: isArabic ? "تم تحميل التقرير المالي بنجاح" : "Financial report downloaded successfully"
          });
        }, 500);
      };
    } else {
      setIsExporting(false);
    }
  };

  const generatePerformanceReport = () => {
    setIsExporting(true);
    
    const reportContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>تقرير الأداء - URTRVL</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              direction: rtl;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #059669;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #059669;
              margin-bottom: 10px;
            }
            .performance-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin: 30px 0;
            }
            .kpi-card {
              background: #f0fdf4;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              border: 1px solid #bbf7d0;
            }
            .kpi-value {
              font-size: 24px;
              font-weight: bold;
              color: #059669;
              margin-bottom: 5px;
            }
            .kpi-label {
              color: #666;
              font-size: 14px;
            }
            .growth-chart {
              margin: 30px 0;
              padding: 20px;
              background: #f0fdf4;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">URTRVL - تقرير الأداء</div>
            <div>تقرير أداء شهري - ${new Date().toLocaleDateString('ar-SA')}</div>
          </div>
          
          <div class="performance-grid">
            <div class="kpi-card">
              <div class="kpi-value">${performanceData.bookingConversion}%</div>
              <div class="kpi-label">معدل تحويل الحجوزات</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${performanceData.customerRetention}%</div>
              <div class="kpi-label">معدل احتفاظ العملاء</div>
            </div>
            <div class="kpi-card">
              <div class="kpi-value">${performanceData.customerSatisfaction}/5</div>
              <div class="kpi-label">تقييم رضا العملاء</div>
            </div>
          </div>

          <div class="growth-chart">
            <h3>نمو الأعمال الشهري</h3>
            <p>يوضح هذا الجدول نمو الأعمال خلال الأشهر الستة الماضية:</p>
            <ul>
              ${performanceData.monthlyGrowth.map((growth, index) => 
                `<li>الشهر ${index + 1}: نمو بنسبة ${growth}%</li>`
              ).join('')}
            </ul>
          </div>

          <div style="margin-top: 30px;">
            <h3>التوصيات:</h3>
            <ul>
              <li>زيادة الاستثمار في التسويق الرقمي لتحسين معدل التحويل</li>
              <li>تطوير برامج ولاء العملاء لزيادة معدل الاحتفاظ</li>
              <li>تحسين جودة الخدمة للحفاظ على تقييم عالي لرضا العملاء</li>
              <li>توسيع العروض والباقات لاستمرار النمو</li>
            </ul>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsExporting(false);
          toast({
            title: isArabic ? "تم تصدير تقرير الأداء" : "Performance Report Exported",
            description: isArabic ? "تم تحميل تقرير الأداء بنجاح" : "Performance report downloaded successfully"
          });
        }, 500);
      };
    } else {
      setIsExporting(false);
    }
  };

  const filteredCustomers = customersData.filter(customer => {
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesDateFrom = !dateFrom || new Date(customer.joinDate) >= new Date(dateFrom);
    const matchesDateTo = !dateTo || new Date(customer.joinDate) <= new Date(dateTo);
    
    return matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const generateCustomersPDF = () => {
    setIsExporting(true);
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>تقرير العملاء - URTRVL</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              direction: rtl;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 10px;
            }
            .date {
              color: #666;
              font-size: 14px;
            }
            .filters-applied {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              border: 1px solid #e2e8f0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: right;
            }
            th {
              background-color: #f8fafc;
              font-weight: bold;
              color: #1e40af;
            }
            .status-active {
              color: #059669;
              font-weight: bold;
            }
            .status-inactive {
              color: #dc2626;
              font-weight: bold;
            }
            .summary {
              margin-top: 30px;
              padding: 20px;
              background-color: #f8fafc;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">URTRVL - تقرير العملاء</div>
            <div class="date">تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')}</div>
          </div>
          
          ${dateFrom || dateTo || statusFilter !== "all" ? `
          <div class="filters-applied">
            <h4>الفلاتر المطبقة:</h4>
            ${dateFrom ? `<p>من تاريخ: ${dateFrom}</p>` : ''}
            ${dateTo ? `<p>إلى تاريخ: ${dateTo}</p>` : ''}
            ${statusFilter !== "all" ? `<p>الحالة: ${statusFilter === 'active' ? 'نشط' : 'غير نشط'}</p>` : ''}
          </div>
          ` : ''}
          
          <div class="summary">
            <h3>ملخص التقرير</h3>
            <p>إجمالي العملاء المفلترين: ${filteredCustomers.length}</p>
            <p>إجمالي الإيرادات: €${filteredCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>اسم العميل</th>
                <th>البريد الإلكتروني</th>
                <th>رقم الهاتف</th>
                <th>تاريخ التسجيل</th>
                <th>عدد الحجوزات</th>
                <th>إجمالي الإنفاق</th>
                <th>الحالة</th>
                <th>آخر دخول</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCustomers.map(customer => `
                <tr>
                  <td>${customer.name}</td>
                  <td>${customer.email}</td>
                  <td>${customer.phone}</td>
                  <td>${customer.joinDate}</td>
                  <td>${customer.totalBookings}</td>
                  <td>€${customer.totalSpent}</td>
                  <td class="status-${customer.status}">
                    ${customer.status === 'active' ? 'نشط' : 'غير نشط'}
                  </td>
                  <td>${customer.lastLogin}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsExporting(false);
          toast({
            title: isArabic ? "تم تصدير تقرير العملاء" : "Customers Report Exported",
            description: isArabic ? "تم تحميل تقرير العملاء بنجاح" : "Customers report downloaded successfully"
          });
        }, 500);
      };
    } else {
      setIsExporting(false);
    }
  };

  const generateBookingsPDF = () => {
    setIsExporting(true);
    
    const bookingsContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>تقرير الحجوزات - URTRVL</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              direction: rtl;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: right;
            }
            th {
              background-color: #f8fafc;
              font-weight: bold;
              color: #1e40af;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">URTRVL - تقرير الحجوزات</div>
            <div>تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>رقم الحجز</th>
                <th>اسم العميل</th>
                <th>الوجهة</th>
                <th>تاريخ السفر</th>
                <th>عدد المسافرين</th>
                <th>المبلغ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BK-2024-001234</td>
                <td>أحمد محمد</td>
                <td>إسطنبول، تركيا</td>
                <td>2024-02-15</td>
                <td>2</td>
                <td>€1200</td>
                <td>مؤكد</td>
              </tr>
              <tr>
                <td>BK-2024-001235</td>
                <td>فاطمة علي</td>
                <td>مدريد، إسبانيا</td>
                <td>2024-03-01</td>
                <td>4</td>
                <td>€2400</td>
                <td>في الانتظار</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(bookingsContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsExporting(false);
          toast({
            title: isArabic ? "تم تصدير تقرير الحجوزات" : "Bookings Report Exported",
            description: isArabic ? "تم تحميل تقرير الحجوزات بنجاح" : "Bookings report downloaded successfully"
          });
        }, 500);
      };
    } else {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* فلاتر التقارير */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {isArabic ? 'فلاتر التقارير' : 'Report Filters'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isArabic ? 'من تاريخ' : 'From Date'}
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isArabic ? 'إلى تاريخ' : 'To Date'}
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isArabic ? 'حالة العميل' : 'Customer Status'}
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? 'جميع الحالات' : 'All Status'}</SelectItem>
                  <SelectItem value="active">{isArabic ? 'نشط' : 'Active'}</SelectItem>
                  <SelectItem value="inactive">{isArabic ? 'غير نشط' : 'Inactive'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isArabic ? 'نوع التقرير' : 'Report Type'}
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? 'جميع التقارير' : 'All Reports'}</SelectItem>
                  <SelectItem value="customers">{isArabic ? 'العملاء فقط' : 'Customers Only'}</SelectItem>
                  <SelectItem value="bookings">{isArabic ? 'الحجوزات فقط' : 'Bookings Only'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التقارير الأساسية */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isArabic ? 'التقارير الأساسية' : 'Basic Reports'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* تصدير بيانات العملاء */}
            <Card className="border-2 border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {isArabic ? 'تقرير العملاء' : 'Customers Report'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'تصدير جميع بيانات العملاء مع الفلاتر' : 'Export all customer data with filters'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'العملاء المفلترين:' : 'Filtered Customers:'}</span>
                    <Badge variant="secondary">{filteredCustomers.length}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'العملاء النشطون:' : 'Active Customers:'}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {filteredCustomers.filter(c => c.status === 'active').length}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={generateCustomersPDF}
                    disabled={isExporting}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 ml-2" />
                    {isExporting 
                      ? (isArabic ? 'جارٍ التصدير...' : 'Exporting...') 
                      : (isArabic ? 'تحميل PDF' : 'Download PDF')
                    }
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => exportToCSV(filteredCustomers, 'customers')}
                      className="text-xs"
                    >
                      <FileSpreadsheet className="h-3 w-3 ml-1" />
                      CSV
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => exportToExcel(filteredCustomers, 'customers')}
                      className="text-xs"
                    >
                      <FileDown className="h-3 w-3 ml-1" />
                      Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* تصدير بيانات الحجوزات */}
            <Card className="border-2 border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {isArabic ? 'تقرير الحجوزات' : 'Bookings Report'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'تصدير جميع بيانات الحجوزات' : 'Export all booking data'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'إجمالي الحجوزات:' : 'Total Bookings:'}</span>
                    <Badge variant="secondary">15</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'الحجوزات المؤكدة:' : 'Confirmed Bookings:'}</span>
                    <Badge className="bg-blue-100 text-blue-800">12</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={generateBookingsPDF}
                    disabled={isExporting}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Download className="h-4 w-4 ml-2" />
                    {isExporting 
                      ? (isArabic ? 'جارٍ التصدير...' : 'Exporting...') 
                      : (isArabic ? 'تحميل PDF' : 'Download PDF')
                    }
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => exportToCSV([{id: '1', customer: 'أحمد', destination: 'تركيا'}], 'bookings')}
                      className="text-xs"
                    >
                      <FileSpreadsheet className="h-3 w-3 ml-1" />
                      CSV
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => exportToExcel([{id: '1', customer: 'أحمد', destination: 'تركيا'}], 'bookings')}
                      className="text-xs"
                    >
                      <FileDown className="h-3 w-3 ml-1" />
                      Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* التقارير المتقدمة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {isArabic ? 'التقارير المتقدمة' : 'Advanced Reports'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* التقرير المالي */}
            <Card className="border-2 border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {isArabic ? 'التقرير المالي' : 'Financial Report'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'تقرير شامل للإيرادات والمصروفات' : 'Comprehensive revenue and expense report'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'إجمالي الإيرادات:' : 'Total Revenue:'}</span>
                    <Badge className="bg-green-100 text-green-800">€{financialData.totalRevenue.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'صافي الربح:' : 'Net Profit:'}</span>
                    <Badge className="bg-blue-100 text-blue-800">€{financialData.profit.toLocaleString()}</Badge>
                  </div>
                </div>

                <Button 
                  onClick={generateFinancialReport}
                  disabled={isExporting}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <PieChart className="h-4 w-4 ml-2" />
                  {isExporting 
                    ? (isArabic ? 'جارٍ التصدير...' : 'Exporting...') 
                    : (isArabic ? 'تحميل التقرير المالي' : 'Download Financial Report')
                  }
                </Button>
              </CardContent>
            </Card>

            {/* تقرير الأداء */}
            <Card className="border-2 border-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {isArabic ? 'تقرير الأداء' : 'Performance Report'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isArabic ? 'مؤشرات الأداء الرئيسية والنمو' : 'Key performance indicators and growth'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'معدل التحويل:' : 'Conversion Rate:'}</span>
                    <Badge className="bg-green-100 text-green-800">{performanceData.bookingConversion}%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'احتفاظ العملاء:' : 'Customer Retention:'}</span>
                    <Badge className="bg-blue-100 text-blue-800">{performanceData.customerRetention}%</Badge>
                  </div>
                </div>

                <Button 
                  onClick={generatePerformanceReport}
                  disabled={isExporting}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <BarChart3 className="h-4 w-4 ml-2" />
                  {isExporting 
                    ? (isArabic ? 'جارٍ التصدير...' : 'Exporting...') 
                    : (isArabic ? 'تحميل تقرير الأداء' : 'Download Performance Report')
                  }
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomerExport;
