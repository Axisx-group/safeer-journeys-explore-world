
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, FileText, Users, Calendar } from "lucide-react";

const AdminCustomerExport = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [isExporting, setIsExporting] = useState(false);

  // بيانات تجريبية للعملاء
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
      lastLogin: "2024-01-20"
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
      lastLogin: "2024-01-19"
    },
    {
      id: "3",
      name: "محمد حسن",
      email: "mohamed@example.com", 
      phone: "+966502345678",
      joinDate: "2024-01-05",
      totalBookings: 2,
      totalSpent: 1200,
      status: "inactive",
      lastLogin: "2024-01-10"
    }
  ];

  const generateCustomersPDF = () => {
    setIsExporting(true);
    
    // إنشاء محتوى HTML للطباعة
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
            .summary-item {
              display: inline-block;
              margin: 10px 20px;
              text-align: center;
            }
            .summary-number {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
            }
            .summary-label {
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">URTRVL - تقرير العملاء</div>
            <div class="date">تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')}</div>
          </div>
          
          <div class="summary">
            <div class="summary-item">
              <div class="summary-number">${customersData.length}</div>
              <div class="summary-label">إجمالي العملاء</div>
            </div>
            <div class="summary-item">
              <div class="summary-number">${customersData.filter(c => c.status === 'active').length}</div>
              <div class="summary-label">العملاء النشطون</div>
            </div>
            <div class="summary-item">
              <div class="summary-number">${customersData.reduce((sum, c) => sum + c.totalBookings, 0)}</div>
              <div class="summary-label">إجمالي الحجوزات</div>
            </div>
            <div class="summary-item">
              <div class="summary-number">€${customersData.reduce((sum, c) => sum + c.totalSpent, 0)}</div>
              <div class="summary-label">إجمالي الإيرادات</div>
            </div>
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
              ${customersData.map(customer => `
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

    // إنشاء نافذة جديدة للطباعة
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // انتظار تحميل المحتوى ثم الطباعة
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsExporting(false);
        }, 500);
      };
    } else {
      setIsExporting(false);
      alert('يرجى السماح بفتح النوافذ المنبثقة لتحميل التقرير');
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
        }, 500);
      };
    } else {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {isArabic ? 'تصدير التقارير' : 'Export Reports'}
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
                      {isArabic ? 'تصدير جميع بيانات العملاء' : 'Export all customer data'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'إجمالي العملاء:' : 'Total Customers:'}</span>
                    <Badge variant="secondary">{customersData.length}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{isArabic ? 'العملاء النشطون:' : 'Active Customers:'}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {customersData.filter(c => c.status === 'active').length}
                    </Badge>
                  </div>
                </div>

                <Button 
                  onClick={generateCustomersPDF}
                  disabled={isExporting}
                  className="w-full"
                >
                  <Download className="h-4 w-4 ml-2" />
                  {isExporting 
                    ? (isArabic ? 'جارٍ التصدير...' : 'Exporting...') 
                    : (isArabic ? 'تحميل تقرير العملاء PDF' : 'Download Customers PDF')
                  }
                </Button>
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

                <Button 
                  onClick={generateBookingsPDF}
                  disabled={isExporting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 ml-2" />
                  {isExporting 
                    ? (isArabic ? 'جارٍ التصدير...' : 'Exporting...') 
                    : (isArabic ? 'تحميل تقرير الحجوزات PDF' : 'Download Bookings PDF')
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
