import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../services/apiConfig';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCompanyData } from '@/lib/companyStore';
import CompanySidebar from "@/components/CompanySidebar";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Users, FileText, Calendar } from 'lucide-react';

interface InterviewResult {
    _id: string;
    candidate_id: string;
    notes: string;
    decision: string;
    timestamp: string;
}

const InterviewPerformance = () => {
    const [results, setResults] = useState<InterviewResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const companyData = getCompanyData();

    useEffect(() => {
        const fetchResults = async () => {
            if (!companyData?.hrEmail) return;

            try {
                const response = await fetch(`${API_BASE_URL}/company/interview-results/${companyData.hrEmail}`);

                if (response.ok) {
                    const data = await response.json();
                    setResults(data);
                }
            } catch (error) {
                console.error("Failed to fetch results", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [companyData?.hrEmail]);

    const getDecisionBadge = (decision: string) => {
        switch (decision) {
            case 'Strong Hire': return <Badge className="bg-emerald-600">Strong Hire</Badge>;
            case 'Hire': return <Badge className="bg-emerald-500">Hire</Badge>;
            case 'Hold': return <Badge className="bg-amber-500">Hold</Badge>;
            case 'Reject': return <Badge variant="destructive">Reject</Badge>;
            default: return <Badge variant="outline">{decision}</Badge>;
        }
    };

    return (
        <CompanySidebar>
            <div className="p-6 lg:p-8 space-y-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center text-forest-medium">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-display text-3xl font-bold text-foreground">Interview Performance</h1>
                        <p className="text-muted-foreground">Track candidate evaluations and decisions</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Evaluations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="text-center py-10 text-muted-foreground">Loading records...</div>
                        ) : results.length === 0 ? (
                            <div className="text-center py-10 text-muted-foreground">No interview records found.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Candidate</TableHead>
                                        <TableHead>Decision</TableHead>
                                        <TableHead className="w-[40%]">Notes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {results.map((result) => (
                                        <TableRow key={result._id}>
                                            <TableCell className="font-medium text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 opacity-50" />
                                                    {format(new Date(result.timestamp), 'MMM d, yyyy')}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">{result.candidate_id}</TableCell>
                                            <TableCell>{getDecisionBadge(result.decision)}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                                                <div className="flex items-start gap-2">
                                                    <FileText className="w-4 h-4 mt-0.5 opacity-50 shrink-0" />
                                                    <span className="truncate block">{result.notes}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </CompanySidebar>
    );
};

export default InterviewPerformance;
