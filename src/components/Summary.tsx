import React from 'react';
import { useFormStore } from '../store/useFormStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';

export const Summary: React.FC = () => {
  const { formData, resetForm } = useFormStore();

  const exportToPDF = async () => {
    const element = document.getElementById('summary-content');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`resumo-cadastro-${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div
        id="summary-content"
        className="bg-zinc-900 border border-brand-border p-6 rounded-xl space-y-6 text-zinc-200"
      >
        <div className="border-b border-brand-border pb-3">
          <h3 className="text-lg font-bold text-white">
            Resumo das Informações
          </h3>
          <p className="text-xs text-zinc-400">
            Confira todos os seus dados informados antes de concluir
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <section>
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              Dados Pessoais
            </h4>
            <p>
              <span className="text-zinc-400">Nome:</span>{' '}
              <strong className="text-white">{formData.fullName}</strong>
            </p>
            <p>
              <span className="text-zinc-400">Nascimento:</span>{' '}
              <strong className="text-white">{formData.birthDate}</strong>
            </p>
            <p>
              <span className="text-zinc-400">CPF:</span>{' '}
              <strong className="text-white">{formData.cpf}</strong>
            </p>
            <p>
              <span className="text-zinc-400">Telefone:</span>{' '}
              <strong className="text-white">{formData.phone}</strong>
            </p>
          </section>

          <section className="pt-2 border-t border-brand-border">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              Endereço
            </h4>
            <p>
              <span className="text-zinc-400">Endereço:</span>{' '}
              <strong className="text-white">{formData.street}</strong>
            </p>
            <p>
              <span className="text-zinc-400">Bairro:</span>{' '}
              <strong className="text-white">{formData.neighborhood}</strong>
            </p>
            <p>
              <span className="text-zinc-400">CEP:</span>{' '}
              <strong className="text-white">{formData.cep}</strong>
            </p>
            <p>
              <span className="text-zinc-400">Cidade/UF:</span>{' '}
              <strong className="text-white">
                {formData.city} / {formData.state}
              </strong>
            </p>
          </section>

          <section className="pt-2 border-t border-brand-border">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
              Profissional
            </h4>
            <p>
              <span className="text-zinc-400">Profissão:</span>{' '}
              <strong className="text-white">{formData.profession}</strong>
            </p>
            <p>
              <span className="text-zinc-400">Empresa:</span>{' '}
              <strong className="text-white">{formData.company}</strong>
            </p>
            <p>
              <span className="text-zinc-400">Salário:</span>{' '}
              <strong className="text-white">{formData.salary}</strong>
            </p>
          </section>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="button"
          onClick={exportToPDF}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" /> Exportar em PDF
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={resetForm}
          className="flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Novo Cadastro
        </Button>
      </div>
    </div>
  );
};
