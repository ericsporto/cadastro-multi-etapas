import React from 'react';
import { useFormStore } from '../store/useFormStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, RotateCcw } from 'lucide-react';

export const Summary: React.FC = () => {
  const { formData, resetForm } = useFormStore();

  const exportToPDF = async () => {
    const element = document.getElementById('summary-content');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`resumo-cadastro-${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div id="summary-content" className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Resumo do Cadastro</h3>

        <div>
          <h4 className="font-semibold text-indigo-600">Dados Pessoais</h4>
          <p><strong>Nome:</strong> {formData.fullName}</p>
          <p><strong>Nascimento:</strong> {formData.birthDate}</p>
          <p><strong>CPF:</strong> {formData.cpf}</p>
          <p><strong>Telefone:</strong> {formData.phone}</p>
        </div>

        <div>
          <h4 className="font-semibold text-indigo-600">Endereço</h4>
          <p><strong>Rua:</strong> {formData.street}</p>
          <p><strong>Bairro:</strong> {formData.neighborhood}</p>
          <p><strong>CEP:</strong> {formData.cep}</p>
          <p><strong>Cidade/UF:</strong> {formData.city} / {formData.state}</p>
        </div>

        <div>
          <h4 className="font-semibold text-indigo-600">Profissão & Renda</h4>
          <p><strong>Profissão:</strong> {formData.profession}</p>
          <p><strong>Empresa:</strong> {formData.company}</p>
          <p><strong>Salário:</strong> {formData.salary}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={exportToPDF}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-indigo-700 transition"
        >
          <Download className="w-4 h-4" /> Exportar PDF
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2.5 px-4 rounded-md font-medium hover:bg-gray-300 transition"
        >
          <RotateCcw className="w-4 h-4" /> Novo Cadastro
        </button>
      </div>
    </div>
  );
};